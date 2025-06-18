
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  TrendingUp, 
  Plus,
  Eye, 
  Edit,
  DollarSign,
  Calendar,
  User,
  Target,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import OpportunityForm from './OpportunityForm';

const OpportunitiesManager = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  // Dados simulados de oportunidades
  const mockOpportunities = [
    {
      id: 1,
      title: 'Expansão de Serviços - ABC Ltda',
      clientName: 'Empresa ABC Ltda',
      clientDocument: '12.345.678/0001-90',
      value: 45000,
      stage: 'Qualificação',
      probability: 65,
      expectedDate: '2024-08-15',
      createdDate: '2024-06-01',
      responsible: user.name,
      sector: user.sector,
      description: 'Cliente interessado em expandir consultoria para outras áreas',
      requirements: 'Consultoria em RH, Financeiro e Operações',
      competitors: 'Concorrente A, Concorrente B',
      nextAction: 'Agendar apresentação técnica',
      nextActionDate: '2024-06-25',
      daysInStage: 15
    },
    {
      id: 2,
      title: 'Nova Consultoria Digital - TechSolutions',
      clientName: 'TechSolutions Corp',
      clientDocument: '98.765.432/0001-10',
      value: 28000,
      stage: 'Proposta',
      probability: 80,
      expectedDate: '2024-07-30',
      createdDate: '2024-05-15',
      responsible: user.name,
      sector: user.sector,
      description: 'Projeto de transformação digital completa',
      requirements: 'Consultoria em tecnologia e processos digitais',
      competitors: 'Concorrente C',
      nextAction: 'Aguardar retorno da proposta',
      nextActionDate: '2024-06-20',
      daysInStage: 8
    },
    {
      id: 3,
      title: 'Auditoria Fiscal - João Silva',
      clientName: 'João Silva Santos',
      clientDocument: '123.456.789-00',
      value: 15000,
      stage: 'Negociação',
      probability: 75,
      expectedDate: '2024-07-15',
      createdDate: '2024-05-20',
      responsible: user.name,
      sector: user.sector,
      description: 'Auditoria fiscal completa para pessoa física',
      requirements: 'Análise fiscal dos últimos 5 anos',
      competitors: 'Nenhum',
      nextAction: 'Definir condições de pagamento',
      nextActionDate: '2024-06-22',
      daysInStage: 12
    },
    {
      id: 4,
      title: 'Planejamento Estratégico - Inovação Digital',
      clientName: 'Inovação Digital Ltda',
      clientDocument: '11.222.333/0001-44',
      value: 65000,
      stage: 'Prospecção',
      probability: 40,
      expectedDate: '2024-09-30',
      createdDate: '2024-06-10',
      responsible: user.name,
      sector: user.sector,
      description: 'Desenvolvimento de planejamento estratégico para os próximos 3 anos',
      requirements: 'Consultoria estratégica e análise de mercado',
      competitors: 'Concorrente A, Concorrente D',
      nextAction: 'Primeira reunião comercial',
      nextActionDate: '2024-06-30',
      daysInStage: 8
    }
  ];

  const filteredOpportunities = mockOpportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || opp.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const stages = ['Prospecção', 'Qualificação', 'Proposta', 'Negociação', 'Fechado', 'Perdido'];
  
  const getStageColor = (stage) => {
    const colors = {
      'Prospecção': 'bg-purple-100 text-purple-800',
      'Qualificação': 'bg-blue-100 text-blue-800',
      'Proposta': 'bg-yellow-100 text-yellow-800',
      'Negociação': 'bg-orange-100 text-orange-800',
      'Fechado': 'bg-green-100 text-green-800',
      'Perdido': 'bg-red-100 text-red-800'
    };
    return colors[stage] || 'bg-gray-100 text-gray-800';
  };

  const getTotalValue = () => filteredOpportunities.reduce((sum, opp) => sum + opp.value, 0);
  const getWeightedValue = () => filteredOpportunities.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0);

  const handleNewOpportunity = () => {
    setSelectedOpportunity(null);
    setShowForm(true);
  };

  const handleEditOpportunity = (opp) => {
    setSelectedOpportunity(opp);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pipeline de Oportunidades</h1>
          <p className="text-gray-600 mt-1">
            {filteredOpportunities.length} oportunidades no pipeline
          </p>
        </div>
        <Button onClick={handleNewOpportunity} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nova Oportunidade
        </Button>
      </div>

      {/* Métricas do pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total do Pipeline</p>
                <p className="text-2xl font-bold">R$ {getTotalValue().toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Ponderado</p>
                <p className="text-2xl font-bold text-green-600">R$ {Math.round(getWeightedValue()).toLocaleString()}</p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Oportunidades Ativas</p>
                <p className="text-2xl font-bold">{filteredOpportunities.length}</p>
              </div>
              <User className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                <p className="text-2xl font-bold text-yellow-600">23.5%</p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por título da oportunidade ou cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por etapa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Etapas</SelectItem>
                {stages.map(stage => (
                  <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline visual por etapas */}
      <Card>
        <CardHeader>
          <CardTitle>Visão do Pipeline por Etapas</CardTitle>
          <CardDescription>Distribuição das oportunidades por etapa do processo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {stages.slice(0, 5).map(stage => {
              const stageOpps = mockOpportunities.filter(opp => opp.stage === stage);
              const stageValue = stageOpps.reduce((sum, opp) => sum + opp.value, 0);
              
              return (
                <div key={stage} className="text-center">
                  <div className={`p-4 rounded-lg ${getStageColor(stage)} mb-2`}>
                    <h3 className="font-semibold text-sm">{stage}</h3>
                    <p className="text-2xl font-bold mt-1">{stageOpps.length}</p>
                    <p className="text-sm">R$ {stageValue.toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Lista de oportunidades */}
      <div className="grid gap-4">
        {filteredOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{opportunity.title}</h3>
                      <p className="text-gray-600">{opportunity.clientName}</p>
                      <p className="text-sm text-gray-500">{opportunity.clientDocument}</p>
                    </div>
                    <Badge className={getStageColor(opportunity.stage)}>
                      {opportunity.stage}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Valor da Oportunidade</p>
                      <p className="text-lg font-bold text-green-600">R$ {opportunity.value.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="font-medium">Probabilidade</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${opportunity.probability}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold">{opportunity.probability}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Previsão de Fechamento</p>
                      <p className="text-gray-600">{new Date(opportunity.expectedDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="font-medium">Tempo na Etapa</p>
                      <p className="text-gray-600">{opportunity.daysInStage} dias</p>
                    </div>
                  </div>

                  <div className="text-sm">
                    <p className="font-medium mb-1">Próxima Ação:</p>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{opportunity.nextAction}</span>
                      <Badge variant="outline">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(opportunity.nextActionDate).toLocaleDateString('pt-BR')}
                      </Badge>
                    </div>
                  </div>

                  {opportunity.daysInStage > 14 && (
                    <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800">
                        Oportunidade parada há {opportunity.daysInStage} dias nesta etapa
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 min-w-fit">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditOpportunity(opportunity)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Nenhuma oportunidade encontrada com os filtros aplicados</p>
          </CardContent>
        </Card>
      )}

      {/* Formulário de oportunidade */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedOpportunity ? 'Editar Oportunidade' : 'Nova Oportunidade'}
            </DialogTitle>
            <DialogDescription>
              {selectedOpportunity 
                ? 'Atualize as informações da oportunidade'
                : 'Registre uma nova oportunidade no pipeline'
              }
            </DialogDescription>
          </DialogHeader>
          <OpportunityForm 
            opportunity={selectedOpportunity}
            user={user}
            onClose={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OpportunitiesManager;
