export const getCurrentDate = () => {
    const now = new Date();
    let curr_date = now.getDate();
    let curr_month = now.getMonth() + 1;
    let curr_year = now.getFullYear();
    return `${curr_year}-${curr_month}-${curr_date}`;
}