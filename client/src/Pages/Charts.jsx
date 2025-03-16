import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Sidenav from '../Components/SideNavigation/Sidenav'; // Import the Sidenav component

const SalesDashboard = () => {
  const [salesData, setSalesData] = useState({
    orders: [],
    categoryDistribution: [],
    priceRanges: [],
    paymentStatus: [],
    regionSales: [],
    customerMetrics: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch orders data
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        const data = await response.json();
        
        // Process the API data into the format needed for charts
        const processedData = processOrderData(data);
        setSalesData(processedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Process the order data into a format suitable for charts
  const processOrderData = (orders) => {
    // Group orders by month
    const ordersByMonth = {};
    const categoryDistribution = {};
    const priceRanges = {
      '0-500': 0,
      '501-1000': 0,
      '1001-1500': 0,
      '1501-2000': 0,
      '2000+': 0
    };
    const paymentStatusCount = {
      'Success': 0,
      'Pending': 0,
      'Failed': 0
    };
    
    // Process each order
    orders.forEach(order => {
      // Process month data
      const date = new Date(order.timestamp.$date);
      const month = date.toLocaleString('default', { month: 'short' });
      
      if (!ordersByMonth[month]) {
        ordersByMonth[month] = {
          month,
          orderCount: 0,
          revenue: 0
        };
      }
      
      // Calculate order revenue and count
      let orderRevenue = 0;
      order.products.forEach(product => {
        orderRevenue += product.Price;
        
        // Process category distribution (assuming product has a category field)
        // If product doesn't have a category, you can adjust this logic
        const category = product.BookTitle?.split(' ')[0] || 'Other'; // Using first word of title as category for demo
        if (!categoryDistribution[category]) {
          categoryDistribution[category] = 0;
        }
        categoryDistribution[category] += product.Price;
        
        // Process price ranges
        const price = product.Price;
        if (price <= 500) {
          priceRanges['0-500']++;
        } else if (price <= 1000) {
          priceRanges['501-1000']++;
        } else if (price <= 1500) {
          priceRanges['1001-1500']++;
        } else if (price <= 2000) {
          priceRanges['1501-2000']++;
        } else {
          priceRanges['2000+']++;
        }
      });
      
      ordersByMonth[month].orderCount++;
      ordersByMonth[month].revenue += orderRevenue;
      
      // Process payment status
      const status = order.paymentStatus || 'Pending';
      paymentStatusCount[status]++;
    });
    
    // Convert objects to arrays for charts
    const monthlyOrders = Object.values(ordersByMonth).sort((a, b) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months.indexOf(a.month) - months.indexOf(b.month);
    });
    
    const categories = Object.entries(categoryDistribution).map(([category, sales]) => ({
      category,
      sales
    }));
    
    const priceRangeData = Object.entries(priceRanges).map(([range, count]) => ({
      range,
      count
    }));
    
    const paymentStatusData = Object.entries(paymentStatusCount).map(([status, count]) => ({
      status,
      count
    }));
    
    // For demo, generate some mock data for regions and customer metrics
    // In a real app, you'd calculate these from actual order data
    const regionSales = [
      { region: 'North', sales: Math.floor(Math.random() * 1000) + 200 },
      { region: 'South', sales: Math.floor(Math.random() * 1000) + 200 },
      { region: 'East', sales: Math.floor(Math.random() * 1000) + 200 },
      { region: 'West', sales: Math.floor(Math.random() * 1000) + 200 },
      { region: 'Central', sales: Math.floor(Math.random() * 1000) + 200 }
    ];
    
    const customerMetrics = [
      { metric: 'New Customers', value: Math.floor(Math.random() * 100) + 50 },
      { metric: 'Returning Customers', value: Math.floor(Math.random() * 200) + 100 },
      { metric: 'Avg Order Value', value: Math.floor(Math.random() * 500) + 1000 },
      { metric: 'CLV', value: Math.floor(Math.random() * 2000) + 3000 },
      { metric: 'Churn Rate', value: Math.floor(Math.random() * 20) + 5 }
    ];
    
    return {
      orders: monthlyOrders,
      categoryDistribution: categories,
      priceRanges: priceRangeData,
      paymentStatus: paymentStatusData,
      regionSales,
      customerMetrics
    };
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  // Chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="flex">
      {/* Sidenav Component */}
      <Sidenav />

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-800 text-white p-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart 1: Monthly Sales Revenue */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Monthly Sales Revenue</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={salesData.orders}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="white" />
                  <YAxis stroke="white" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#374151', color: 'white', border: 'none' }}
                    itemStyle={{ color: 'white' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#4bc0c0" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                    dot={{ stroke: '#4bc0c0', strokeWidth: 2, r: 4, fill: "#1f2937" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Product Categories Distribution */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Product Categories</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesData.categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="sales"
                    nameKey="category"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {salesData.categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#374151', color: 'white', border: 'none' }}
                    itemStyle={{ color: 'white' }}
                    formatter={(value) => `₹${value.toFixed(2)}`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Price Range Distribution */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Price Range Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData.priceRanges}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="range" stroke="white" />
                  <YAxis stroke="white" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#374151', color: 'white', border: 'none' }}
                    itemStyle={{ color: 'white' }}
                  />
                  <Legend />
                  <Bar dataKey="count" name="Number of Products" fill="#9966FF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 4: Payment Status */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Payment Status</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesData.paymentStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="status"
                    label
                  >
                    {salesData.paymentStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={
                        entry.status === 'Success' ? '#4bc0c0' : 
                        entry.status === 'Pending' ? '#ffce56' : 
                        '#ff6384'
                      } />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#374151', color: 'white', border: 'none' }}
                    itemStyle={{ color: 'white' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 5: Regional Sales */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Regional Sales</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData.regionSales}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" stroke="white" />
                  <YAxis dataKey="region" type="category" stroke="white" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#374151', color: 'white', border: 'none' }}
                    itemStyle={{ color: 'white' }}
                    formatter={(value) => `₹${value.toFixed(2)}`}
                  />
                  <Legend />
                  <Bar dataKey="sales" name="Sales" fill="#ff7c43">
                    {salesData.regionSales.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 6: Customer Metrics */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Customer Metrics</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={salesData.customerMetrics}>
                  <PolarGrid stroke="rgba(255,255,255,0.3)" />
                  <PolarAngleAxis dataKey="metric" stroke="white" />
                  <PolarRadiusAxis stroke="white" />
                  <Radar
                    name="Current Period"
                    dataKey="value"
                    stroke="#ff6384"
                    fill="#ff6384"
                    fillOpacity={0.6}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#374151', color: 'white', border: 'none' }}
                    itemStyle={{ color: 'white' }}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;