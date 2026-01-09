import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RoleBadge } from '@/components/RoleBadge';
import { StatusBadge } from '@/components/StatusBadge';
import { mockVehicleDocuments } from '@/data/mockData';
import { FileText, Upload, Calendar, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const DocumentsPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Documents</h1>
            <RoleBadge role="DRIVER" />
          </div>
          <p className="text-muted-foreground">Manage your verification documents</p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <div className="grid gap-4">
        {mockVehicleDocuments.map((doc) => (
          <Card key={doc.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  doc.status === 'APPROVED' ? 'bg-success/10' : 
                  doc.status === 'PENDING' ? 'bg-warning/10' : 'bg-destructive/10'
                }`}>
                  <FileText className={`h-6 w-6 ${
                    doc.status === 'APPROVED' ? 'text-success' : 
                    doc.status === 'PENDING' ? 'text-warning' : 'text-destructive'
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {doc.documentType.replace(/_/g, ' ')}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Expires: {format(new Date(doc.expiresAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={doc.status} type="document" />
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentsPage;