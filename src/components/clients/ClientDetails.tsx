
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  FileText,
  TrendingUp,
  DollarSign,
  User,
  Clock
} from 'lucide-react';

const ClientDetails = ({ client, onClose }) => {
  // Dados simulados de histórico e contratos
  const mockContracts = [
    {
      id: 1,
      number: 'CT-2024-001',
      service: 'Consultoria Empresarial',
      value: 25000,
      startDate: '2024-01-15',
      endDate: '2024-12-15',
      status: 'Ativo',
      paymentStatus: 'Em dia'
    },
    {
      id: 2,
      number: 'CT-2023-045',
      service: 'Auditoria Fiscal',
      value: 15000,
      startDate: '2023-06-01',
      endDate: '2024-05-31',
      status: 'Finalizado',
      paymentStatus: 'Pago'
    }
  ];

  const mockInteractions = [
    {
      id: 1,
      date: '2024-06-15',
      type: 'Ligação',
      description: 'Contato para renovação de contrato',
      user: 'Carlos Silva',
      notes: 'Cliente interessado em expandir serviços'
    },
    {
      id: 2,
      date: '2024-06-10',
      type: 'Email',
      description: 'Envio de proposta comercial',
      user: 'Ana Santos',
      notes: 'Proposta para novo projeto enviada'
    },
    {
      id: 3,
      date: '2024-06-05',
      type: 'Reunião',
      description: 'Apresentação de resultados',
      user: 'Carlos Silva',
      notes: 'Cliente satisfeito com resultados obtidos'
    }
  ];

  const mockOpportunities = [
    {
      id: 1,
      title: 'Expansão de Serviços',
      value: 35000,
      stage: 'Proposta',
      probability: 75,
      expectedDate: '2024-07-30'
    },
    {
      id: 2,
      title: 'Consultoria Digital',
      value: 20000,
      stage: 'Negociação',
      probability: 60,
      expectedDate: '2024-08-15'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Cabeçalho do cliente */}
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          {client.type === 'PJ' ? (
            <Building2 className="w-8 h-8 text-blue-600" />
          ) : (
            <span className="text-blue-600 font-bold text-xl">
              {client.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
          <p className="text-gray-600 mb-2">{client.document}</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant={client.status === 'Ativo' ? 'default' : 'secondary'}>
              {client.status}
            </Badge>
            {client.isBaseClient && (
              <Badge variant="outline" className="text-green-600 border-green-200">
                Cliente da Base
              </Badge>
            )}
            <Badge variant="outline">{client.type}</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações de contato */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-gray-600">{client.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gray-400" />
              <div>
                <p className="font-medium">Telefone</p>
                <p className="text-sm text-gray-600">{client.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-gray-400" />
              <div>
                <p className="font-medium">Endereço</p>
                <p className="text-sm text-gray-600">{client.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-gray-400" />
              <div>
                <p className="font-medium">Setor</p>
                <p className="text-sm text-gray-600">{client.sector}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-gray-400" />
              <div>
                <p className="font-medium">Último Contato</p>
                <p className="text-sm text-gray-600">
                  {new Date(client.lastContact).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo financeiro */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resumo Financeiro</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Contratos Ativos</span>
              <span className="font-semibold">{client.contracts}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Valor Total</span>
              <span className="font-semibold text-green-600">
                R$ {client.totalValue.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Valor Médio</span>
              <span className="font-semibold">
                R$ {client.contracts > 0 ? Math.round(client.totalValue / client.contracts).toLocaleString() : '0'}
              </span>
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium">Oportunidades em Andamento</p>
              {mockOpportunities.map(opp => (
                <div key={opp.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{opp.title}</span>
                  <span className="font-medium">R$ {opp.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Informações do cadastro */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações do Cadastro</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Cadastrado por</p>
              <p className="font-medium">{client.createdBy}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Data de Cadastro</p>
              <p className="font-medium">15/01/2024</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Última Atualização</p>
              <p className="font-medium">
                {new Date(client.lastContact).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium text-green-600">Indicadores Positivos</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Pagamentos sempre em dia</li>
                <li>• Alto potencial de expansão</li>
                <li>• Relacionamento de longo prazo</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contratos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Contratos
          </CardTitle>
          <CardDescription>Histórico de contratos e serviços</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockContracts.map(contract => (
              <div key={contract.id} className="border rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-semibold">{contract.service}</h4>
                    <p className="text-sm text-gray-600">Contrato: {contract.number}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(contract.startDate).toLocaleDateString('pt-BR')} - {new Date(contract.endDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2">
                    <p className="font-semibold text-lg">R$ {contract.value.toLocaleString()}</p>
                    <div className="flex gap-2">
                      <Badge variant={contract.status === 'Ativo' ? 'default' : 'secondary'}>
                        {contract.status}
                      </Badge>
                      <Badge variant={contract.paymentStatus === 'Em dia' ? 'outline' : 'secondary'}>
                        {contract.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Histórico de interações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Histórico de Interações
          </CardTitle>
          <CardDescription>Últimas interações e anotações comerciais</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockInteractions.map(interaction => (
              <div key={interaction.id} className="border-l-4 border-blue-200 pl-4 py-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{interaction.type}</Badge>
                      <span className="font-medium">{interaction.description}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{interaction.notes}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>{new Date(interaction.date).toLocaleDateString('pt-BR')}</p>
                    <p>por {interaction.user}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Oportunidades em andamento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Oportunidades em Andamento
          </CardTitle>
          <CardDescription>Oportunidades de upsell e expansão</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {mockOpportunities.map(opportunity => (
              <div key={opportunity.id} className="border rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-semibold">{opportunity.title}</h4>
                    <p className="text-sm text-gray-600">
                      Etapa: {opportunity.stage} • Probabilidade: {opportunity.probability}%
                    </p>
                    <p className="text-sm text-gray-600">
                      Previsão: {new Date(opportunity.expectedDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg text-green-600">
                      R$ {opportunity.value.toLocaleString()}
                    </p>
                    <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${opportunity.probability}%` }}
                      ></div>
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

export default ClientDetails;
