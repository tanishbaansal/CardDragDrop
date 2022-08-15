import { updateData } from "../extraUtils/fetchData";

const CardSave = async (changedData) => {
    if (changedData.length > 0) {
        changedData.map((element) => updateData(element));
    }
    // This is for testing Purpose Only as Updation of data is fast so to
    // check the functionality of loading and last save date added this sleep timer so
    // those elements can be visible on the screen for some time
    if (process.env.REACT_APP_TESTING_MODE === "true") {
        console.log("In Testing Mode");
        function sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }
        async function testSleep() {
            await sleep(5000);
        }
        await testSleep();
    }

    return true;
};

export default CardSave;
