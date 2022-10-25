import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useState,useMemo,useEffect } from "react";
import axios from 'axios'
import { useContext } from "react";
import {AuthContext} from '../../context/authContext/AuthContext'

export default function Home() {
  const user=useContext(AuthContext)
  const axiosInstance =axios.create({baseURL:process.env.REACT_APP_API_URL})
  const MONTHS = useMemo(() =>
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
,[]);
const [userStats, setUserStats] = useState([]);
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axiosInstance.get("/users/stats", {
          headers: {
            token: `Bearer ${user.user.accessToken}`
          },
        });
        const statsList = res.data.sort((a, b) => { return a._id - b._id });
        statsList.map(item => setUserStats(prev => [...prev, { name: MONTHS[item._id - 1], "New Users This Month": item.total }]))
      } catch (error) {
        console.log(error)
      }
    };
    getStats();
  }, [MONTHS]);
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New Users This Month"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
