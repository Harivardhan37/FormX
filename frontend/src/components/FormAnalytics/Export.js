import * as XLSX from "xlsx";

function formatValue(value) {
  if (Array.isArray(value)) {
    return value.join(", "); // or use <br /> if you want line breaks
  }

  if (isValidDate(value)) {
    return new Date(value).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return value;
}

function isValidDate(value) {
  const date = new Date(value);
  return (
    typeof value === "string" &&
    !isNaN(date.getTime()) &&
    /\d{4}-\d{2}-\d{2}/.test(value)
  );
}


function Export(fields, responses, title) {
    const data = responses.map((response) => {
        const submission = JSON.parse(response.submission_data);
        const rows = {};
        fields.forEach((field) => {
            rows[field.label] = formatValue(submission[field.uuid]);
        })
        return rows;
    })
    console.log(data);

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");

    XLSX.writeFile(workbook, `${title}${Date.now()}.xlsx`);
}

export default Export