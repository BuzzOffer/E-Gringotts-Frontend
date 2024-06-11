export const ApiDateFormat = (date) => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });

    let [dateSection, timeSection] = formatter.format(date).split(',');      

    let [day, month, year] = dateSection.split('/');
    dateSection = `${year}-${month}-${day}`;

    const formattedDate = `${dateSection}${timeSection}`;
    return formattedDate;
}