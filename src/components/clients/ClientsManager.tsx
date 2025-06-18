
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  UserPlus, 
  Eye, 
  Edit, 
  FileText,
  Phone,
  Mail,
  MapPin,
  Building2,
  Filter
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ClientForm from './ClientForm';
import ClientDetails from './ClientDetails';

const ClientsManager = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Dados simulados de clientes
  const mockClients = [
    {
      id: 1,
      name: 'Empresa ABC Ltda',
      document: '12.345.678/0001-90',
      type: 'PJ',
      email: 'contato@empresaabc.com.br',
      phone: '(11) 99999-9999',
      address: 'Rua das Flores, 123 - São Paulo/SP',
      sector: user.sector,
      status: 'Ativo',
      contracts: 3,
      totalValue: 45000,
      lastContact: '2024-06-15',
      isBaseClient: true,
      createdBy: user.name
    },
    {
      id: 2,
      name: 'João Silva Santos',
      document: '123.456.789-00',
      type: 'PF',
      email: 'joao.silva@email.com',
      phone: '(11) 88888-8888',
      address: 'Av. Paulista, 1000 - São Paulo/SP',
      sector: user.sector,
      status: 'Ativo',
      contracts: 1,
      totalValue: 12000,
      lastContact: '2024-06-10',
      isBaseClient: true,
      createdBy: user.name
    },
    {
      id: 3,
      name: 'TechSolutions Corp',
      document: '98.765.432/0001-10',
      type: 'PJ',
      email: 'admin@techsolutions.com',
      phone: '(11) 77777-7777',
      address: 'Rua da Tecnologia, 456 - São Paulo/SP',
      sector: user.sector,
      status: 'Prospecto',
      contracts: 0,
      totalValue: 0,
      lastContact: '2024-06-18',
      isBaseClient: false,
      createdBy: user.name
    }
  ];

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.document.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewClient = (client) => {
    setSelectedClient(client);
    setShowDetails(true);
  };

  const handleNewClient = () => {
    setSelectedClient(null);
    setShowForm(true);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Clientes</h1>
          <p className="text-gray-600 mt-1">
            {filteredClients.length} clientes encontrados
          </p>
        </div>
        <Button onClick={handleNewClient} className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Filtros e busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome, documento ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de clientes */}
      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      {client.type === 'PJ' ? (
                        <Building2 className="w-6 h-6 text-blue-600" />
                      ) : (
                        <span className="text-blue-600 font-semibold">
                          {client.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{client.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{client.document}</span>
                        <Badge variant={client.status === 'Ativo' ? 'default' : 'secondary'}>
                          {client.status}
                        </Badge>
                        {client.isBaseClient && (
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            Cliente da Base
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{client.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{client.address}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-3 text-sm text-gray-600">
                    <span>{client.contracts} contratos</span>
                    <span>R$ {client.totalValue.toLocaleString()}</span>
                    <span>Último contato: {new Date(client.lastContact).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewClient(client)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClient(client)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Formulário de cliente */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedClient ? 'Editar Cliente' : 'Novo Cliente'}
            </DialogTitle>
            <DialogDescription>
              {selectedClient 
                ? 'Atualize as informações do cliente'
                : 'Preencha os dados para cadastrar um novo cliente'
              }
            </DialogDescription>
          </DialogHeader>
          <ClientForm 
            client={selectedClient}
            user={user}
            onClose={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Detalhes do cliente */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes do Cliente</DialogTitle>
            <DialogDescription>
              Visualização completa dos dados e histórico
            </DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <ClientDetails 
              client={selectedClient}
              onClose={() => setShowDetails(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientsManager;
