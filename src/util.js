export const sortData = data => {
    const sortedData = [...data];

    //sorts data, descendingly
    sortedData.sort((a, b) => a.cases > b.cases? -1 : 1)

    return sortedData;
}