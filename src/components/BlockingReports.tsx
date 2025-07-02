
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Search, 
  Filter, 
  Download,
  AlertTriangle,
  Clock,
  MapPin,
  Ban,
  Activity,
  Globe
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const BlockingReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("all");

  const blocks = [
    {
      id: 1,
      ip: "192.168.1.45",
      user: "João Silva",
      threat: "Malware - Trojan.Win32",
      category: "Malware",
      severity: "high",
      time: "14:32:15",
      date: "2024-07-02",
      action: "blocked",
      source: "External",
      destination: "malicious-site.com",
      port: "443"
    },
    {
      id: 2,
      ip: "192.168.1.67",
      user: "Maria Santos",
      threat: "Phishing - Fake Bank",
      category: "Phishing",
      severity: "medium",
      time: "14:28:42",
      date: "2024-07-02",
      action: "blocked",
      source: "External",
      destination: "fake-bank.net",
      port: "80"
    },
    {
      id: 3,
      ip: "192.168.1.89",
      user: "Pedro Costa",
      threat: "Spam - Email Bot",
      category: "Spam",
      severity: "low",
      time: "14:25:33",
      date: "2024-07-02",
      action: "blocked",
      source: "Internal",
      destination: "smtp.spammer.com",
      port: "25"
    },
    {
      id: 4,
      ip: "192.168.1.123",
      user: "Ana Oliveira",
      threat: "Botnet - C&C Server",
      category: "Botnet",
      severity: "high",
      time: "14:20:18",
      date: "2024-07-02",
      action: "blocked",
      source: "External",
      destination: "c2-server.evil",
      port: "8080"
    },
    {
      id: 5,
      ip: "192.168.1.156",
      user: "Carlos Lima",
      threat: "Adware - PopUp Generator",
      category: "Adware",
      severity: "low",
      time: "14:15:07",
      date: "2024-07-02",
      action: "blocked",
      source: "External",
      destination: "ads.suspicious.com",
      port: "443"
    }
  ];

  const threatStats = [
    { name: 'Malware', value: 45, color: '#EF4444' },
    { name: 'Phishing', value: 30, color: '#F59E0B' },
    { name: 'Spam', value: 15, color: '#8B5CF6' },
    { name: 'Botnet', value: 10, color: '#EF4444' },
  ];

  const hourlyBlocks = [
    { hour: '00:00', blocks: 5 },
    { hour: '04:00', blocks: 2 },
    { hour: '08:00', blocks: 12 },
    { hour: '12:00', blocks: 18 },
    { hour: '16:00', blocks: 15 },
    { hour: '20:00', blocks: 8 },
  ];

  const filteredBlocks = blocks.filter(block => {
    const matchesSearch = block.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         block.ip.includes(searchTerm) ||
                         block.threat.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         block.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterSeverity === "all" || block.severity === filterSeverity;
    
    return matchesSearch && matchesFilter;
  });

  const getSeverityBadge = (severity: string) => {
    const variants = {
      high: "destructive",
      medium: "default",
      low: "secondary"
    };
    
    return (
      <Badge variant={variants[severity as keyof typeof variants] as any}>
        {severity.toUpperCase()}
      </Badge>
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "malware":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "phishing":
        return <Globe className="h-4 w-4 text-orange-500" />;
      default:
        return <Ban className="h-4 w-4 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-red-600" />
            <span>Relatórios de Bloqueios e Segurança</span>
          </CardTitle>
          <CardDescription>
            Monitore ameaças bloqueadas, tentativas de acesso malicioso e análise de segurança
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 space-x-4 w-full sm:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por usuário, IP, ameaça ou destino..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Severidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bloqueios</p>
                <p className="text-2xl font-bold text-red-600">{blocks.length}</p>
              </div>
              <Ban className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Alta Severidade</p>
                <p className="text-2xl font-bold text-red-600">
                  {blocks.filter(b => b.severity === "high").length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Última Hora</p>
                <p className="text-2xl font-bold text-orange-600">23</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taxa de Bloqueio</p>
                <p className="text-2xl font-bold text-green-600">99.2%</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Blocks Chart */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Bloqueios por Hora</span>
            </CardTitle>
            <CardDescription>
              Distribuição de ameaças bloqueadas nas últimas 24 horas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyBlocks}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="blocks" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Threat Distribution */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-600" />
              <span>Tipos de Ameaças</span>
            </CardTitle>
            <CardDescription>
              Distribuição por categoria de ameaça
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={threatStats}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {threatStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Blocks Table */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Ameaças Bloqueadas ({filteredBlocks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBlocks.map((block) => (
              <div key={block.id} className="p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-start">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20">
                      {getCategoryIcon(block.category)}
                    </div>
                    <div>
                      <p className="font-medium">{block.user}</p>
                      <p className="text-sm text-muted-foreground">{block.ip}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-red-600">{block.threat}</p>
                    <p className="text-sm text-muted-foreground">{block.category}</p>
                  </div>
                  
                  <div>
                    {getSeverityBadge(block.severity)}
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">{block.destination}</p>
                    <p className="text-xs text-muted-foreground">Porta: {block.port}</p>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{block.time}</span>
                  </div>
                  
                  <div className="text-right">
                    <Badge variant="destructive">
                      <Ban className="h-3 w-3 mr-1" />
                      BLOQUEADO
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{block.source}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredBlocks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum bloqueio encontrado com os filtros aplicados</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlockingReports;
