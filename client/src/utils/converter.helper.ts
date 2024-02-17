export function getUserNameColor (username:string) {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return '#' + ('00000' + (hash & 0xFFFFFF).toString(16)).slice(-6);
}


export function formatDateFromTimestamp(timestamp:string){
  const newDate = new Date(timestamp);
  const time = newDate.toLocaleString().split(',')[1].trim();
  const date = newDate.toLocaleString().split(',')[0].trim();
  return {time, date};
}