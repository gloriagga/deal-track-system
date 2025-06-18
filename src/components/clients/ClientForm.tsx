
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ClientForm = ({ client, user, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    document: '',
    type: 'PJ',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    sector: user.sector,
    status: 'Prospecto',
    notes: ''
  });

  const [documentCheck, setDocumentCheck] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || '',
        document: client.document || '',
        type: client.type || 'PJ',
        email: client.email || '',
        phone: client.phone || '',
        address: client.address || '',
        city: client.city || '',
        state: client.state || '',
        zipCode: client.zipCode || '',
        sector: client.sector || user.sector,
        status: client.status || 'Prospecto',
        notes: client.notes || ''
      });
    }
  }, [client, user.sector]);

  // Simular verificação de cliente na base
  const checkClientInBase = (document) => {
    if (!document || document.length < 11) {
      setDocumentCheck(null);
      return;
    }

    // Simulação de clientes existentes
    const existingClients = [
      { document: '12.345.678/0001-90', name: 'Empresa ABC Ltda' },
      { document: '123.456.789-00', name: 'João Silva Santos' }
    ];

    const foundClient = existingClients.find(c => c.document === document);
    
    if (foundClient) {
      setDocumentCheck({
        exists: true,
        clientName: foundClient.name,
        message: 'Cliente já cadastrado na base'
      });
    } else {
      setDocumentCheck({
        exists: false,
        message: 'Novo cliente - não encontrado na base'
      });
    }
  };

  const formatDocument = (value, type) => {
    const numbers = value.replace(/\D/g, '');
    if (type === 'PJ') {
      return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    } else {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
  };

  const handleDocumentChange = (value) => {
    const formatted = formatDocument(value, formData.type);
    setFormData({ ...formData, document: formatted });
    checkClientInBase(formatted);
  };

  const handleTypeChange = (type) => {
    setFormData({ ...formData, type, document: '' });
    setDocumentCheck(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulação de salvamento
    setTimeout(() => {
      toast({
        title: client ? "Cliente atualizado!" : "Cliente cadastrado!",
        description: `${formData.name} foi ${client ? 'atualizado' : 'cadastrado'} com sucesso.`,
      });
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Verificação de documento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Identificação do Cliente
          </CardTitle>
          <CardDescription>
            O setor {user.sector} será automaticamente identificado para este cadastro
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="type">Tipo</Label>
              <Select value={formData.type} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                  <SelectItem value="PF">Pessoa Física</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="document">
                {formData.type === 'PJ' ? 'CNPJ' : 'CPF'}
              </Label>
              <Input
                id="document"
                value={formData.document}
                onChange={(e) => handleDocumentChange(e.target.value)}
                placeholder={formData.type === 'PJ' ? '00.000.000/0000-00' : '000.000.000-00'}
                maxLength={formData.type === 'PJ' ? 18 : 14}
              />
            </div>
          </div>

          {/* Status da verificação */}
          {documentCheck && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              documentCheck.exists 
                ? 'bg-orange-50 border border-orange-200' 
                : 'bg-green-50 border border-green-200'
            }`}>
              {documentCheck.exists ? (
                <AlertCircle className="w-5 h-5 text-orange-600" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              <div>
                <p className={`font-medium ${
                  documentCheck.exists ? 'text-orange-800' : 'text-green-800'
                }`}>
                  {documentCheck.message}
                </p>
                {documentCheck.exists && (
                  <p className="text-sm text-orange-600">
                    Cliente: {documentCheck.clientName}
                  </p>
                )}
              </div>
              {documentCheck.exists && (
                <Badge variant="outline" className="ml-auto">
                  Cliente da Base
                </Badge>
              )}
            </div>
          )}

          <div>
            <Label htmlFor="sector">Setor (Identificação Automática)</Label>
            <Input
              id="sector"
              value={formData.sector}
              disabled
              className="bg-blue-50 border-blue-200"
            />
            <p className="text-xs text-blue-600 mt-1">
              Setor identificado automaticamente com base no seu login
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dados básicos */}
      <Card>
        <CardHeader>
          <CardTitle>Dados Básicos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">
              {formData.type === 'PJ' ? 'Razão Social / Nome Fantasia' : 'Nome Completo'}
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(00) 00000-0000"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Prospecto">Prospecto</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Endereço */}
      <Card>
        <CardHeader>
          <CardTitle>Endereço</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address">Logradouro</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="SP"
                maxLength={2}
              />
            </div>
            <div>
              <Label htmlFor="zipCode">CEP</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                placeholder="00000-000"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Observações */}
      <Card>
        <CardHeader>
          <CardTitle>Observações Comerciais</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Anotações importantes sobre o cliente, histórico comercial, preferências, etc."
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Botões */}
      <div className="flex gap-4 pt-4">
        <Button type="submit" className="flex-1" disabled={loading}>
          {loading ? 'Salvando...' : (client ? 'Atualizar Cliente' : 'Cadastrar Cliente')}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default ClientForm;
