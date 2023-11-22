import XLSX from 'xlsx';

const DownloadTable = () => {
  const download = (items, start, end) => {
    const filteredData = items.filter((row) => {
      const date = new Date(row.date);
      return date >= new Date(start) && date <= new Date(end);
    });
    const requiredData = filteredData.map(
      ({ imgpath, createdAt, updatedAt, __v, ...rest }) => rest
    );

    const worksheet = XLSX.utils.json_to_sheet(requiredData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Table Data');
    XLSX.writeFile(workbook, 'table.xlsx');
  };

  return { download };
};

export default DownloadTable;
