
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Shield, 
  Activity, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Wifi,
  Server,
  Smartphone,
  Laptop,
  Clock
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const DashboardOverview = () => {
  const stats = [
    {
      title: "Usuários Conectados",
      value: "147",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Bloqueios Hoje",
      value: "23",
      change: "-8%",
      trend: "down",
      icon: Shield,
      color: "text-green-600"
    },
    {
      title: "Tráfego (GB)",
      value: "2.4TB",
      change: "+15%",
      trend: "up",
      icon: Activity,
      color: "text-purple-600"
    },
    {
      title: "Ameaças Detectadas",
      value: "5",
      change: "-50%",
      trend: "down",
      icon: AlertTriangle,
      color: "text-red-600"
    }
  ];

  const trafficData = [
    { time: '00:00', upload: 120, download: 280 },
    { time: '04:00', upload: 80, download: 180 },
    { time: '08:00', upload: 220, download: 420 },
    { time: '12:00', upload: 350, download: 580 },
    { time: '16:00', upload: 280, download: 480 },
    { time: '20:00', upload: 190, download: 320 },
  ];

  const deviceData = [
    { name: 'Smartphones', value: 45, color: '#0066CC' },
    { name: 'Laptops', value: 30, color: '#3388DD' },
    { name: 'IoT', value: 15, color: '#66AAEE' },
    { name: 'Outros', value: 10, color: '#99CCFF' },
  ];

  const recentBlocks = [
    { ip: "192.168.1.45", reason: "Malware", time: "14:32", severity: "high" },
    { ip: "192.168.1.67", reason: "Phishing", time: "14:28", severity: "medium" },
    { ip: "192.168.1.123", reason: "Spam", time: "14:25", severity: "low" },
    { ip: "192.168.1.89", reason: "Botnet", time: "14:20", severity: "high" },
  ];

  return (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === "up";
          const TrendIcon = isPositive ? TrendingUp : TrendingDown;
          
          return (
            <Card key={index} className="glass-effect hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <TrendIcon className={`h-3 w-3 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
                    {stat.change}
                  </span>
                  <span>desde ontem</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Chart */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Tráfego de Rede (24h)</span>
            </CardTitle>
            <CardDescription>
              Upload e download em MB/s
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="download" stroke="#0066CC" strokeWidth={2} />
                <Line type="monotone" dataKey="upload" stroke="#3388DD" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Distribution */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wifi className="h-5 w-5 text-green-600" />
              <span>Dispositivos Conectados</span>
            </CardTitle>
            <CardDescription>
              Distribuição por tipo de dispositivo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Blocks */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-600" />
              <span>Bloqueios Recentes</span>
            </CardTitle>
            <CardDescription>
              Últimas ameaças bloqueadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBlocks.map((block, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className="flex flex-col">
                      <span className="font-medium">{block.ip}</span>
                      <span className="text-xs text-muted-foreground">{block.reason}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={block.severity === 'high' ? 'destructive' : 
                              block.severity === 'medium' ? 'default' : 'secondary'}
                    >
                      {block.severity}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {block.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Server className="h-5 w-5 text-purple-600" />
              <span>Status do Sistema</span>
            </CardTitle>
            <CardDescription>
              Monitoramento em tempo real
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">CPU Usage</span>
                  <span className="text-sm">34%</span>
                </div>
                <Progress value={34} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Memory Usage</span>
                  <span className="text-sm">67%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Storage</span>
                  <span className="text-sm">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <div className="text-xs text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <div className="text-2xl font-bold text-blue-600">147</div>
                  <div className="text-xs text-muted-foreground">Clients</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
