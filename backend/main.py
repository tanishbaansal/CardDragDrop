
from pstats import Stats
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


def dbOperations(type, sqlQuery):
    try:
        sqlQuery = sqlQuery
        # declare a cursor object from the connection
        conn = connectDb()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        # execute the INSERT statement
        cursor.execute(sqlQuery)

        print(f'executed query')
        if(type == "insert" or type == "update"):
            # add the data to the postgressql database
            conn.commit()
            result = "SUCCESS"
        if(type == "select"):
            result = cursor.fetchall()
        # close communication with the database
        conn.close()
        return result
    except (Exception) as error:
        return error
    finally:
        if conn is not None:
            conn.close()


def getData(request):
    return JSONResponse(dbOperations("select", "SELECT * FROM catData"))


async def addData(request):
    jsondata = await request.json()
    print(f'Request Data {jsondata}')
    status = dbOperations(
        "insert", f"INSERT INTO catData(type,title,position) VALUES('{ jsondata['type']}','{jsondata['title']}','{ jsondata['position']}')")
    return JSONResponse({'status': status})


async def updateData(request):
    jsondata = await request.json()
    print(f'Request Data {jsondata}')
    status = dbOperations(
        "update", f"UPDATE catData SET position = {jsondata['position']} WHERE type = '{jsondata['type']}'")
    print(f'This status = {status}')
    return JSONResponse({'status': status})


routes = [
    Route('/data', getData),
    Route('/insertdata', addData, methods=['POST']),
    Route('/updatedata', updateData, methods=['PUT'])
]
middleware = [
    Middleware(CORSMiddleware, allow_origins=['*'])
]

app = Starlette(routes=routes, middleware=middleware)
