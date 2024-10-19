exports.generateInvoiceNumber = function () {
    // Get the current date in the format YYYYMMDD
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, '');

    // Generate a random 3-digit number
    const randomNumber = Math.floor(100 + Math.random() * 900); // 100 to 999

    // Combine them to form the invoice number
    return `INV${formattedDate}-${randomNumber}`;
}