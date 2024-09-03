export const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatCustomDate = (dateString: string) => {
  const date = new Date(dateString);
  const options = { month: "long", day: "numeric", weekday: "long" };
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const monthDay = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  return `${monthDay}, ${weekday}`;
};
