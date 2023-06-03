import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from "recharts";

const dailySales = [
  {
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const data = [
  {
    name: "Day 1",
    dayily_sales: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: "Day 2",
    dayily_sales: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: "Day 3",
    dayily_sales: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: "Day 4",
    dayily_sales: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: "Day 5",
    dayily_sales: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: "Day 6",
    dayily_sales: 1400,
    pv: 680,
    amt: 1700,
  },
];

export const DailyChart = () => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          {/* <p className="intro">{getIntroOfPage(label)}</p> */}
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div>
        <ResponsiveContainer width="90%" height={150}>
          <BarChart
            width={80}
            height={80}
            data={dailySales}
            barCategoryGap="10%"
            barSize={20}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />

            <Bar dataKey="uv" fill="#413ea0" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export const WeeklyChart = () => {
  return (
    <>
      <div>
        <ResponsiveContainer width="90%" height={150}>
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="dayily_sales" barSize={20} fill="#413ea0" />
            <Line type="monotone" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
