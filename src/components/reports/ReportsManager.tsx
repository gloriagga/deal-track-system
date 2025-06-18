
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Download,
  FileSpreadsheet,
  FileText,
  Calendar,
  Users,
  DollarSign,
  Target
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const ReportsManager = ({ user }) => {
  const [reportType, setReportType] = useState('pipeline');
  const [period, setPeriod] = useState('month');

  // Dados simulados para relatórios
  const pipelineData = [
    { stage: 'Prospecção', count: 15, value: 450000 },
    { stage: 'Qualificação', count: 12, value: 380000 },
    { stage: 'Proposta', count: 8, value: 280000 },
    { stage: 'Negociação', count: 5, value: 190000 },
    { stage: 'Fechado', count: 3, value: 95000 }
  ];

  const performanceData = [
    { month: 'Jan', vendas: 45000, meta: 50000, leads: 120, conversao: 15 },
    { month: 'Fev', vendas: 52000, meta: 50000, leads: 135, conversao: 18 },
    { month: 'Mar', vendas: 48000, meta: 55000, leads: 145, conversao: 16 },
    { month: 'Abr', vendas: 61000, meta: 55000, leads: 160, conversao: 22 },
    { month: 'Mai', vendas: 58000, meta: 60000, leads: 155, conversao: 20 },
    { month: 'Jun', vendas: 67000, meta: 60000, leads: 170, conversao: 24 }
  ];

  const competitorData = [
    { competitor: 'Concorrente A', ganhos: 12, perdas: 8, taxa: 60 },
    { competitor: 'Concorrente B', ganhos: 8, perdas: 12, taxa: 40 },
    { competitor: 'Concorrente C', ganhos: 15, perdas: 5, taxa: 75 },
    { competitor: 'Mercado Geral', ganhos: 25, perdas: 15, taxa: 62.5 }
  ];

  const sectorData = [
    { name: 'Comercial', value: 45, color: '#3B82F6' },
    { name: 'Suporte', value: 23, color: '#10B981' },
    { name: 'Financeiro', value: 18, color: '#F59E0B' },
    { name: 'Operações', value: 14, color: '#EF4444' }
  ];

  const exportReport = (format) => {
    // Simulação de exportação
    setTimeout(() => {
      alert(`Relatório exportado em ${format.toUpperCase()}!`);
    }, 1000);
  };

  const renderPipelineReport = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pipeline de Vendas - Análise Detalhada</CardTitle>
          <CardDescription>Distribuição e performance do pipeline por etapa</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis yAxisId="count" orientation="left" />
              <YAxis yAxisId="value" orientation="right" />
              <Tooltip formatter={(value, name) => {
                if (name === 'count') return [value, 'Oportunidades'];
                return [`R$ ${value.toLocaleString()}`, 'Valor'];
              }} />
              <Bar yAxisId="count" dataKey="count" fill="#3B82F6" name="count" />
              <Bar yAxisId="value" dataKey="value" fill="#10B981" name="value" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Métricas do Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total de Oportunidades</span>
                <span className="font-bold">43</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Valor Total do Pipeline</span>
                <span className="font-bold text-green-600">R$ 1.395.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Taxa de Conversão Média</span>
                <span className="font-bold">23.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Tempo Médio no Pipeline</span>
                <span className="font-bold">45 dias</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gargalos Identificados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">Etapa: Qualificação</p>
                <p className="text-xs text-yellow-600">Tempo médio: 18 dias (acima da média)</p>
              </div>
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-medium text-red-800">Etapa: Negociação</p>
                <p className="text-xs text-red-600">Taxa de conversão: 62% (abaixo da meta)</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Recomendação</p>
                <p className="text-xs text-blue-600">Revisar processo de qualificação</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPerformanceReport = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance de Vendas vs Metas</CardTitle>
          <CardDescription>Comparativo mensal de vendas realizadas e metas estabelecidas</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
              <Bar dataKey="vendas" fill="#10B981" name="Vendas" />
              <Bar dataKey="meta" fill="#E5E7EB" name="Meta" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Line type="monotone" dataKey="conversao" stroke="#3B82F6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumo do Período</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total de Vendas</span>
                <span className="font-bold text-green-600">R$ 331.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Meta Total</span>
                <span className="font-bold">R$ 330.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Atingimento da Meta</span>
                <Badge className="bg-green-100 text-green-800">100.3%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Leads Gerados</span>
                <span className="font-bold">885</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Taxa de Conversão Média</span>
                <span className="font-bold">19.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCompetitorReport = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Análise de Concorrência</CardTitle>
          <CardDescription>Performance competitiva e análise de ganhos/perdas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {competitorData.map((competitor, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{competitor.competitor}</h4>
                  <Badge variant={competitor.taxa >= 60 ? 'default' : 'secondary'}>
                    {competitor.taxa}% de sucesso
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-green-600">{competitor.ganhos}</p>
                    <p className="text-gray-600">Ganhos</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-red-600">{competitor.perdas}</p>
                    <p className="text-gray-600">Perdas</p>
                  </div>
                  <div className="text-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${competitor.taxa}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-600">Taxa</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estratégias Recomendadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-800">Concorrente C - Alta taxa de sucesso</p>
              <p className="text-xs text-green-600">Analisar diferenciais e estratégias utilizadas</p>
            </div>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">Concorrente B - Necessita atenção</p>
              <p className="text-xs text-yellow-600">Revisar abordagem e propostas de valor</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Oportunidade Identificada</p>
              <p className="text-xs text-blue-600">Segmento com baixa concorrência detectado</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSectorReport = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance por Setor</CardTitle>
          <CardDescription>Distribuição e performance dos setores da empresa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-4">
              {sectorData.map((sector, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: sector.color }}
                    ></div>
                    <span className="font-medium">{sector.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{sector.value}%</p>
                    <p className="text-sm text-gray-600">do total</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Setor Líder</p>
                <p className="text-xl font-bold text-blue-600">Comercial</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Maior Crescimento</p>
                <p className="text-xl font-bold text-green-600">Suporte</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Setores</p>
                <p className="text-xl font-bold">4</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Receita Total</p>
                <p className="text-xl font-bold text-green-600">R$ 1.2M</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderReport = () => {
    switch (reportType) {
      case 'pipeline':
        return renderPipelineReport();
      case 'performance':
        return renderPerformanceReport();
      case 'competitor':
        return renderCompetitorReport();
      case 'sector':
        return renderSectorReport();
      default:
        return renderPipelineReport();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios e Análises</h1>
          <p className="text-gray-600 mt-1">
            Análises detalhadas de performance e inteligência comercial
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportReport('pdf')}>
            <FileText className="w-4 h-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" onClick={() => exportReport('excel')}>
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Excel
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de Relatório" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pipeline">Pipeline de Vendas</SelectItem>
                  <SelectItem value="performance">Performance vs Meta</SelectItem>
                  <SelectItem value="competitor">Análise de Concorrência</SelectItem>
                  <SelectItem value="sector">Performance por Setor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Última Semana</SelectItem>
                  <SelectItem value="month">Último Mês</SelectItem>
                  <SelectItem value="quarter">Último Trimestre</SelectItem>
                  <SelectItem value="year">Último Ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conteúdo do relatório */}
      {renderReport()}
    </div>
  );
};

export default ReportsManager;
