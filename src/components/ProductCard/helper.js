export const getDaysDiff = (last_day) => {
    const current_date = new Date();
    const date = new Date(last_day);

    let diff = date - current_date;

    diff /= 1000; 
    diff /= 60;    
    diff /= 60;    
    diff /= 24; 

    return Math.ceil(diff);
}