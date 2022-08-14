
from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route
from psycopg2 import connect
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from psycopg2.extras import RealDictCursor

table_name = "catData"

# Declare connection instance


def connectDb():
    return connect(
        dbname="database",
        user="admin",
        host="db",
        password="carddragdrop"
    )

# Creating a function to add new data to the cat Table


def addDataInDb(type, title, position):
    try:
        sqlQuery = f"INSERT INTO catData(type,title,position) VALUES('{type}','{title}','{position}')"
        # declare a cursor object from the connection
        conn = connectDb()
        cursor = conn.cursor()
        # execute the INSERT statement
        cursor.execute(sqlQuery)
        # add the data to the postgressql database
        conn.commit()
        # close communication with the database
        conn.close()
        return "SUCCESS"
    except (Exception) as error:
        print(error)
        return "FAILURE"
    finally:
        if conn is not None:
            conn.close()


def getDataFromDb():
    # Retrieve all the data from catTable
    sqlQuery = "SELECT * FROM catData"
    conn = connectDb()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    # execute the Select statement
    cursor.execute(sqlQuery)
    catData = cursor.fetchall()
    # close communication with the database
    conn.close()
    return catData


def getData(request):
    print(f'Get data - {getDataFromDb()}')
    return JSONResponse(getDataFromDb())


async def addData(request):
    jsondata = await request.json()
    print(f'Request Data {jsondata}')
    status = addDataInDb(
        jsondata['type'], jsondata['title'], jsondata['position'])
    return JSONResponse({'status': status})


routes = [
    Route('/data', getData),
    Route('/data', addData, methods=['POST'])
]
middleware = [
    Middleware(CORSMiddleware, allow_origins=['*'])
]

app = Starlette(routes=routes, middleware=middleware)
