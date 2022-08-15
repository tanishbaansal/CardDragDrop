import { fetchData } from "./fetchData";

const dataDiffChecker = async (newData) => {
    //Check if data is updated
    const oldData = await fetchData();

    // To get the differnce in the Old and new data we just filter the old
    // data and check if the position of a particular type is changed in the new data
    const changedData = newData.filter((element) => {
        return (
            oldData.find((item) => item.type === element.type).position !==
            element.position
        );
    });
    return changedData;
};

export default dataDiffChecker;
