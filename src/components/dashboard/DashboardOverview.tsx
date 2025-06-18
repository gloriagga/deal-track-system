
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  DollarSign,
  UserPlus,
  AlertTriangle,
  Activity,
  Target
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const DashboardOverview = ({ user }) => {
  // Dados simulados para demonstração
  const metrics = {
    totalClients: 1247,
    activeContracts: 156,
    monthlyRevenue: 89500,
    conversionRate: 23.5,
    newClientsThisMonth: 34,
    pendingOpportunities: 67
  };

  const pipelineData = [
    { name: 'Prospecção', value: 45, color: '#8B5CF6' },
    { name: 'Qualificação', value: 32, color: '#06B6D4' },
    { name: 'Proposta', value: 23, color: '#F59E0B' },
    { name: 'Negociação', value: 18, color: '#EF4444' },
    { name: 'Fechado', value: 12, color: '#10B981' }
  ];

  const monthlyPerformance = [
    { month: 'Jan', vendas: 45000, metas: 50000 },
    { month: 'Fev', vendas: 52000, metas: 50000 },
    { month: 'Mar', vendas: 48000, metas: 55000 },
    { month: 'Abr', vendas: 61000, metas: 55000 },
    { month: 'Mai', vendas: 58000, metas: 60000 },
    { month: 'Jun', vendas: 67000, metas: 60000 }
  ];

  const sectorPerformance = [
    { setor: 'Comercial', clientes: 456, contratos: 89 },
    { setor: 'Suporte', clientes: 234, contratos: 45 },
    { setor: 'Financeiro', clientes: 123, contratos: 22 },
    { setor: 'Operações', clientes: 434, contratos: 76 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Comercial</h1>
          <p className="text-gray-600 mt-1">
            Bem-vindo, {user.name} • {user.sector}
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Novo Cliente
          </Button>
        </div>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalClients.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contratos Ativos</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeContracts}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {metrics.monthlyRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.conversionRate}%</div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              <AlertTriangle className="w-3 h-3 mr-1" />
              -2% vs mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline de vendas */}
        <Card>
          <CardHeader>
            <CardTitle>Pipeline de Vendas</CardTitle>
            <CardDescription>Distribuição de oportunidades por etapa</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pipelineData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {pipelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance mensal */}
        <Card>
          <CardHeader>
            <CardTitle>Performance vs Meta</CardTitle>
            <CardDescription>Vendas mensais comparadas às metas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
                <Bar dataKey="vendas" fill="#3B82F6" name="Vendas" />
                <Bar dataKey="metas" fill="#E5E7EB" name="Meta" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance por setor */}
      <Card>
        <CardHeader>
          <CardTitle>Performance por Setor</CardTitle>
          <CardDescription>Distribuição de clientes e contratos por setor</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sectorPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="setor" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clientes" fill="#06B6D4" name="Clientes" />
              <Bar dataKey="contratos" fill="#10B981" name="Contratos" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Alertas e ações rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
              Alertas Importantes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm">15 contratos vencem em 30 dias</span>
              <Button size="sm" variant="outline">Ver detalhes</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="text-sm">8 clientes sem contato há 90 dias</span>
              <Button size="sm" variant="outline">Ativar</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm">23 propostas aguardando retorno</span>
              <Button size="sm" variant="outline">Acompanhar</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-500" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <UserPlus className="w-4 h-4 mr-2" />
              Cadastrar novo cliente
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Criar nova proposta
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              Registrar oportunidade
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
