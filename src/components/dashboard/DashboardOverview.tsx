import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  DollarSign,
  UserPlus,
  Eye,
  Calendar,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DashboardOverview = ({ user }) => {
  // Dados simulados para os gráficos
  const data = [
    { name: 'Jan', clientes: 40, contratos: 24, oportunidades: 18 },
    { name: 'Fev', clientes: 30, contratos: 13, oportunidades: 20 },
    { name: 'Mar', clientes: 20, contratos: 98, oportunidades: 12 },
    { name: 'Abr', clientes: 27, contratos: 39, oportunidades: 22 },
    { name: 'Mai', clientes: 18, contratos: 48, oportunidades: 17 },
    { name: 'Jun', clientes: 23, contratos: 38, oportunidades: 25 },
    { name: 'Jul', clientes: 34, contratos: 43, oportunidades: 21 },
    { name: 'Ago', clientes: 26, contratos: 56, oportunidades: 8 },
    { name: 'Set', clientes: 37, contratos: 28, oportunidades: 15 },
    { name: 'Out', clientes: 42, contratos: 34, oportunidades: 28 },
    { name: 'Nov', clientes: 28, contratos: 45, oportunidades: 19 },
    { name: 'Dez', clientes: 39, contratos: 50, oportunidades: 30 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const pieData = [
    { name: 'Ativos', value: 400 },
    { name: 'Inativos', value: 300 },
    { name: 'Prospectos', value: 300 },
    { name: 'Em negociação', value: 200 },
  ];

  // Dados simulados para as métricas
  const totalClientes = data.reduce((acc, curr) => acc + curr.clientes, 0);
  const totalContratos = data.reduce((acc, curr) => acc + curr.contratos, 0);
  const totalOportunidades = data.reduce((acc, curr) => acc + curr.oportunidades, 0);
  const receitaTotal = totalContratos * 1500; // Simulação de receita

  // Dados simulados para atividades recentes
  const recentActivities = [
    { id: 1, description: 'Novo cliente "Empresa XPTO" cadastrado', date: '2024-07-01' },
    { id: 2, description: 'Contrato #123 renovado com sucesso', date: '2024-06-28' },
    { id: 3, description: 'Oportunidade "Venda de Software" movida para a fase de proposta', date: '2024-06-25' },
    { id: 4, description: 'Relatório de vendas de Junho gerado', date: '2024-06-22' },
    { id: 5, description: 'Usuário "Carlos Silva" acessou o sistema', date: '2024-06-20' },
  ];

  // Dados simulados para oportunidades
  const opportunities = [
    { id: 1, name: 'Venda de Software', client: 'Empresa XPTO', value: 15000, status: 'Proposta' },
    { id: 2, name: 'Consultoria em Marketing', client: 'Startup ABC', value: 8000, status: 'Qualificação' },
    { id: 3, name: 'Treinamento de Equipes', client: 'Indústria XYZ', value: 12000, status: 'Negociação' },
  ];

  // Check if user can create new clients (not assistente)
  const canCreateClients = user.role !== 'Assistente de Suporte';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Bem-vindo de volta, {user.name}
          </p>
        </div>
        {canCreateClients && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Novo Cliente
          </Button>
        )}
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Clientes</CardTitle>
            <CardDescription>Total de clientes cadastrados</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-blue-600">
            {totalClientes}
            <Users className="w-5 h-5 ml-2 inline-block align-middle" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contratos</CardTitle>
            <CardDescription>Número total de contratos ativos</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-green-600">
            {totalContratos}
            <FileText className="w-5 h-5 ml-2 inline-block align-middle" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Oportunidades</CardTitle>
            <CardDescription>Oportunidades de negócio em aberto</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-orange-600">
            {totalOportunidades}
            <TrendingUp className="w-5 h-5 ml-2 inline-block align-middle" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receita</CardTitle>
            <CardDescription>Receita total estimada</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-purple-600">
            R$ {receitaTotal.toLocaleString()}
            <DollarSign className="w-5 h-5 ml-2 inline-block align-middle" />
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
            <CardDescription>Clientes, contratos e oportunidades por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clientes" fill="#8884d8" name="Clientes" />
                <Bar dataKey="contratos" fill="#82ca9d" name="Contratos" />
                <Bar dataKey="oportunidades" fill="#ffc658" name="Oportunidades" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status dos Clientes</CardTitle>
            <CardDescription>Distribuição dos clientes por status</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {
                    pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                  }
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Atividades Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
          <CardDescription>Últimas atividades no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-none p-0">
            {recentActivities.map(activity => (
              <li key={activity.id} className="py-2 border-b border-gray-200 last:border-none">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-800">{activity.description}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  <Calendar className="w-3 h-3 mr-1 inline-block" />
                  {new Date(activity.date).toLocaleDateString('pt-BR')}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Oportunidades */}
      <Card>
        <CardHeader>
          <CardTitle>Oportunidades</CardTitle>
          <CardDescription>Oportunidades de negócio em aberto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {opportunities.map(opportunity => (
                  <tr key={opportunity.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{opportunity.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{opportunity.client}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">R$ {opportunity.value.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="secondary">{opportunity.status}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
