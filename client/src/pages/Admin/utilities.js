function formatDateTime(datetime) {
    const datetimeLocaleFormatting = {
        // weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    };
    let formattedDateTime = new Date(datetime).toLocaleDateString(
        "en-us",
        datetimeLocaleFormatting
    );
    return formattedDateTime;
}

export default formatDateTime;