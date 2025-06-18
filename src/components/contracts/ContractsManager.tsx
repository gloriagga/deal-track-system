
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  FileText, 
  Eye, 
  Download,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter
} from 'lucide-react';

const ContractsManager = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  // Dados simulados de contratos
  const mockContracts = [
    {
      id: 1,
      number: 'CT-2024-001',
      clientName: 'Empresa ABC Ltda',
      clientDocument: '12.345.678/0001-90',
      service: 'Consultoria Empresarial',
      value: 25000,
      startDate: '2024-01-15',
      endDate: '2024-12-15',
      status: 'Ativo',
      paymentStatus: 'Em dia',
      paymentMethod: 'Boleto Mensal',
      nextPayment: '2024-07-15',
      sector: user.sector,
      responsible: user.name
    },
    {
      id: 2,
      number: 'CT-2024-002',
      clientName: 'TechSolutions Corp',
      clientDocument: '98.765.432/0001-10',
      service: 'Auditoria Fiscal',
      value: 18000,
      startDate: '2024-03-01',
      endDate: '2024-08-31',
      status: 'Ativo',
      paymentStatus: 'Atrasado',
      paymentMethod: 'Transferência',
      nextPayment: '2024-06-01',
      sector: user.sector,
      responsible: user.name
    },
    {
      id: 3,
      number: 'CT-2023-045',
      clientName: 'João Silva Santos',
      clientDocument: '123.456.789-00',
      service: 'Consultoria Tributária',
      value: 12000,
      startDate: '2023-06-01',
      endDate: '2024-05-31',
      status: 'Finalizado',
      paymentStatus: 'Pago',
      paymentMethod: 'PIX',
      nextPayment: null,
      sector: user.sector,
      responsible: user.name
    },
    {
      id: 4,
      number: 'CT-2024-003',
      clientName: 'Inovação Digital Ltda',
      clientDocument: '11.222.333/0001-44',
      service: 'Planejamento Estratégico',
      value: 35000,
      startDate: '2024-05-01',
      endDate: '2025-04-30',
      status: 'Ativo',
      paymentStatus: 'Em dia',
      paymentMethod: 'Cartão de Crédito',
      nextPayment: '2024-07-01',
      sector: user.sector,
      responsible: user.name
    }
  ];

  const filteredContracts = mockContracts.filter(contract => {
    const matchesSearch = contract.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.number.includes(searchTerm) ||
                         contract.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || contract.paymentStatus === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Ativo':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Finalizado':
        return <Clock className="w-4 h-4 text-gray-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Em dia':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Atrasado':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'Pago':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const totalValue = filteredContracts.reduce((sum, contract) => sum + contract.value, 0);
  const activeContracts = filteredContracts.filter(c => c.status === 'Ativo').length;
  const overdueContracts = filteredContracts.filter(c => c.paymentStatus === 'Atrasado').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Contratos</h1>
          <p className="text-gray-600 mt-1">
            {filteredContracts.length} contratos encontrados
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="w-4 h-4 mr-2" />
          Novo Contrato
        </Button>
      </div>

      {/* Métricas resumidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Contratos</p>
                <p className="text-2xl font-bold">{filteredContracts.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contratos Ativos</p>
                <p className="text-2xl font-bold text-green-600">{activeContracts}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Total</p>
                <p className="text-2xl font-bold">R$ {totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Em Atraso</p>
                <p className="text-2xl font-bold text-red-600">{overdueContracts}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
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
                placeholder="Buscar por cliente, número do contrato ou serviço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status do Contrato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Finalizado">Finalizado</SelectItem>
                <SelectItem value="Suspenso">Suspenso</SelectItem>
              </SelectContent>
            </Select>

            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status de Pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Pagamentos</SelectItem>
                <SelectItem value="Em dia">Em dia</SelectItem>
                <SelectItem value="Atrasado">Atrasado</SelectItem>
                <SelectItem value="Pago">Pago</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de contratos */}
      <div className="grid gap-4">
        {filteredContracts.map((contract) => (
          <Card key={contract.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(contract.status)}
                    <div>
                      <h3 className="font-semibold text-lg">{contract.number}</h3>
                      <p className="text-gray-600">{contract.clientName}</p>
                      <p className="text-sm text-gray-500">{contract.clientDocument}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Serviço</p>
                      <p className="text-gray-600">{contract.service}</p>
                    </div>
                    <div>
                      <p className="font-medium">Valor</p>
                      <p className="text-gray-600 font-semibold">R$ {contract.value.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="font-medium">Período</p>
                      <p className="text-gray-600">
                        {new Date(contract.startDate).toLocaleDateString('pt-BR')} - {new Date(contract.endDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Forma de Pagamento</p>
                      <p className="text-gray-600">{contract.paymentMethod}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant={contract.status === 'Ativo' ? 'default' : 'secondary'}>
                      {contract.status}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={getPaymentStatusColor(contract.paymentStatus)}
                    >
                      {contract.paymentStatus}
                    </Badge>
                    {contract.nextPayment && (
                      <Badge variant="outline">
                        Próximo: {new Date(contract.nextPayment).toLocaleDateString('pt-BR')}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-fit">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar
                  </Button>
                </div>
              </div>

              {/* Informações adicionais para contratos em atraso */}
              {contract.paymentStatus === 'Atrasado' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <p className="text-sm font-medium text-red-800">
                      Pagamento em atraso desde {new Date(contract.nextPayment).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                      Entrar em contato
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                      Gerar cobrança
                    </Button>
                  </div>
                </div>
              )}

              {/* Informações adicionais para contratos próximos do vencimento */}
              {contract.status === 'Ativo' && new Date(contract.endDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-yellow-600" />
                    <p className="text-sm font-medium text-yellow-800">
                      Contrato vence em breve - {new Date(contract.endDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="text-yellow-600 border-yellow-300">
                      Iniciar renovação
                    </Button>
                    <Button size="sm" variant="outline" className="text-yellow-600 border-yellow-300">
                      Agendar reunião
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContracts.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Nenhum contrato encontrado com os filtros aplicados</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContractsManager;
