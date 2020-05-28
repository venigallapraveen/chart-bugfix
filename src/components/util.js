const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const genData = () => {
  const data = [];

  for (let i = -20; i < 10; i++) {
    const series1 = randomNumber(100, 300);
    const series2 = randomNumber(100, 300);
    const series3 = randomNumber(100, 300);
    const timestamp = new Date(new Date().getTime() + i * 12 * 15 * 60000);
    let obj = {
      timestamp,
      series1,
      series2,
      series3,
    };
    data.push(obj);
  }
  return data;
};
