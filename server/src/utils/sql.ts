export function makeSearchSql(payload: {
  text: string;
  searchQueryUsingCount: number;
  searchQuery?: string;
}) {
  const { searchQueryUsingCount, text, searchQuery } = payload;
  const searchSql = searchQuery ? text : "";
  const searchParams = searchQuery
    ? Array(searchQueryUsingCount).fill(`%${searchQuery}%`)
    : [];
  return { searchSql, searchParams };
}