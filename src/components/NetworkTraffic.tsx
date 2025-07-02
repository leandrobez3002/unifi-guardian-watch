
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Network, 
  TrendingUp,
  TrendingDown,
  Activity,
  Download,
  Upload,
  Wifi,
  Server,
  Globe
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const NetworkTraffic = () => {
  const [timeRange, setTimeRange] = useState("24h");

  const trafficData = [
    { time: '00:00', upload: 120, download: 280, total: 400 },
    { time: '02:00', upload: 90, download: 220, total: 310 },
    { time: '04:00', upload: 80, download: 180, total: 260 },
    { time: '06:00', upload: 150, download: 320, total: 470 },
    { time: '08:00', upload: 220, download: 420, total: 640 },
    { time: '10:00', upload: 280, download: 480, total: 760 },
    { time: '12:00', upload: 350, download: 580, total: 930 },
    { time: '14:00', upload: 320, download: 520, total: 840 },
    { time: '16:00', upload: 280, download: 480, total: 760 },
    { time: '18:00', upload: 240, download: 420, total: 660 },
    { time: '20:00', upload: 190, download: 320, total: 510 },
    { time: '22:00', upload: 140, download: 260, total: 400 },
  ];

  const protocolData = [
    { protocol: 'HTTP/HTTPS', usage: 45, color: '#0066CC' },
    { protocol: 'Video Streaming', usage: 25, color: '#EF4444' },
    { protocol: 'Gaming', usage: 15, color: '#10B981' },
    { protocol: 'File Transfer', usage: 10, color: '#F59E0B' },
    { protocol: 'Other', usage: 5, color: '#8B5CF6' },
  ];

  const topApplications = [
    { name: 'YouTube', traffic: '1.2 GB', percentage: 35, type: 'streaming' },
    { name: 'Teams', traffic: '450 MB', percentage: 15, type: 'communication' },
    { name: 'Netflix', traffic: '800 MB', percentage: 25, type: 'streaming' },
    { name: 'WhatsApp', traffic: '120 MB', percentage: 5, type: 'communication' },
    { name: 'Dropbox', traffic: '320 MB', percentage: 10, type: 'storage' },
    { name: 'Others', traffic: '380 MB', percentage: 10, type: 'other' },
  ];

  const networkInterfaces = [
    {
      name: 'WAN',
      type: 'Internet',
      status: 'active',
      speed: '1 Gbps',
      utilization: 45,
      packetsIn: '2.5M',
      packetsOut: '1.8M',
      errorsIn: 12,
      errorsOut: 5
    },
    {
      name: 'LAN',
      type: 'Local',
      status: 'active',
      speed: '1 Gbps',
      utilization: 67,
      packetsIn: '8.2M',
      packetsOut: '6.1M',
      errorsIn: 3,
      errorsOut: 1
    },
    {
      name: 'WiFi 5GHz',
      type: 'Wireless',
      status: 'active',
      speed: '867 Mbps',
      utilization: 34,
      packetsIn: '4.1M',
      packetsOut: '3.2M',
      errorsIn: 8,
      errorsOut: 4
    },
    {
      name: 'WiFi 2.4GHz',
      type: 'Wireless',
      status: 'active',
      speed: '300 Mbps',
      utilization: 78,
      packetsIn: '1.9M',
      packetsOut: '1.5M',
      errorsIn: 15,
      errorsOut: 7
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Internet':
        return <Globe className="h-4 w-4" />;
      case 'Local':
        return <Network className="h-4 w-4" />;
      case 'Wireless':
        return <Wifi className="h-4 w-4" />;
      default:
        return <Server className="h-4 w-4" />;
    }
  };

  const getApplicationIcon = (type: string) => {
    switch (type) {
      case 'streaming':
        return <Activity className="h-4 w-4 text-red-500" />;
      case 'communication':
        return <Network className="h-4 w-4 text-blue-500" />;
      case 'storage':
        return <Server className="h-4 w-4 text-green-500" />;
      default:
        return <Globe className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Network className="h-5 w-5 text-purple-600" />
            <span>Análise de Tráfego de Rede</span>
          </CardTitle>
          <CardDescription>
            Monitore o uso de banda, protocolos e aplicações em tempo real
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Última hora</SelectItem>
                  <SelectItem value="24h">Últimas 24h</SelectItem>
                  <SelectItem value="7d">Últimos 7 dias</SelectItem>
                  <SelectItem value="30d">Últimos 30 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Exportar Relatório</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Traffic Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Download Total</p>
                <p className="text-2xl font-bold text-blue-600">2.4 TB</p>
                <div className="flex items-center space-x-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>+15%</span>
                </div>
              </div>
              <Download className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upload Total</p>
                <p className="text-2xl font-bold text-green-600">850 GB</p>
                <div className="flex items-center space-x-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>+8%</span>
                </div>
              </div>
              <Upload className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pico de Tráfego</p>
                <p className="text-2xl font-bold text-purple-600">930 MB/s</p>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <span>às 12:00</span>
                </div>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Utilização Média</p>
                <p className="text-2xl font-bold text-orange-600">56%</p>
                <div className="flex items-center space-x-1 text-xs text-red-500">
                  <TrendingDown className="h-3 w-3" />
                  <span>-3%</span>
                </div>
              </div>
              <Network className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Chart */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Tráfego de Rede - Últimas 24 Horas</CardTitle>
          <CardDescription>
            Monitoramento de upload, download e tráfego total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="download" stackId="1" stroke="#0066CC" fill="#0066CC" fillOpacity={0.6} />
              <Area type="monotone" dataKey="upload" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Applications and Protocols */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Applications */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Principais Aplicações</span>
            </CardTitle>
            <CardDescription>
              Consumo de banda por aplicação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topApplications.map((app, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    {getApplicationIcon(app.type)}
                    <div>
                      <p className="font-medium">{app.name}</p>
                      <p className="text-sm text-muted-foreground">{app.traffic}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{app.percentage}%</p>
                    <div className="w-20 h-2 bg-muted rounded-full mt-1">
                      <div 
                        className="h-full bg-blue-600 rounded-full" 
                        style={{ width: `${app.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Protocol Distribution */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Network className="h-5 w-5 text-green-600" />
              <span>Protocolos de Rede</span>
            </CardTitle>
            <CardDescription>
              Distribuição por tipo de protocolo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={protocolData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="protocol" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="usage" fill="#0066CC" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Network Interfaces */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="h-5 w-5 text-purple-600" />
            <span>Interfaces de Rede</span>
          </CardTitle>
          <CardDescription>
            Status e utilização das interfaces de rede
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {networkInterfaces.map((interface_, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-muted">
                      {getTypeIcon(interface_.type)}
                    </div>
                    <div>
                      <p className="font-medium">{interface_.name}</p>
                      <p className="text-sm text-muted-foreground">{interface_.type} - {interface_.speed}</p>
                    </div>
                  </div>
                  <Badge variant={interface_.status === 'active' ? 'default' : 'secondary'}>
                    {interface_.status === 'active' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Utilização</span>
                      <span>{interface_.utilization}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div 
                        className={`h-full rounded-full ${
                          interface_.utilization > 80 ? 'bg-red-500' :
                          interface_.utilization > 60 ? 'bg-orange-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${interface_.utilization}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Pacotes In</p>
                      <p className="font-medium">{interface_.packetsIn}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Pacotes Out</p>
                      <p className="font-medium">{interface_.packetsOut}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Erros In</p>
                      <p className="font-medium text-red-500">{interface_.errorsIn}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Erros Out</p>
                      <p className="font-medium text-red-500">{interface_.errorsOut}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkTraffic;
