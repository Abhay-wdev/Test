
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Users, Mail, Phone, MessageSquare } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useLeads } from "@/hooks/useLeads";
import { toast } from "sonner";

const LeadsManagement = () => {
  const { data: leads = [], isLoading, error } = useLeads();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredLeads = leads.filter(lead => 
    selectedStatus === "all" || lead.status === selectedStatus
  );

  const getStatusBadge = (status: string) => {
    const config = {
      new: { variant: "default" as const, color: "bg-blue-100 text-blue-800" },
      contacted: { variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800" },
      qualified: { variant: "default" as const, color: "bg-green-100 text-green-800" },
      converted: { variant: "default" as const, color: "bg-purple-100 text-purple-800" },
      closed: { variant: "secondary" as const, color: "bg-gray-100 text-gray-800" }
    };
    
    const { color } = config[status as keyof typeof config] || config.new;
    
    return (
      <Badge className={color}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getLeadsStats = () => {
    return {
      total: leads.length,
      new: leads.filter(l => l.status === 'new').length,
      contacted: leads.filter(l => l.status === 'contacted').length,
      qualified: leads.filter(l => l.status === 'qualified').length,
      converted: leads.filter(l => l.status === 'converted').length,
    };
  };

  const downloadExcel = () => {
    try {
      // Create CSV content
      const headers = ['Name', 'Email', 'Phone', 'Message', 'Source', 'Status', 'Created Date'];
      const csvContent = [
        headers.join(','),
        ...filteredLeads.map(lead => [
          `"${lead.name}"`,
          `"${lead.email}"`,
          `"${lead.phone || ''}"`,
          `"${(lead.message || '').replace(/"/g, '""')}"`,
          `"${lead.source}"`,
          `"${lead.status}"`,
          `"${format(parseISO(lead.created_at), 'yyyy-MM-dd HH:mm:ss')}"`
        ].join(','))
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `leads_${format(new Date(), 'yyyy-MM-dd')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Leads exported successfully!');
    } catch (error) {
      console.error('Error downloading leads:', error);
      toast.error('Failed to export leads');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-spice-earth">Leads Management</h1>
          <p className="text-muted-foreground">Loading leads...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-spice-earth">Leads Management</h1>
          <p className="text-red-600">Error loading leads: {error.message}</p>
        </div>
      </div>
    );
  }

  const stats = getLeadsStats();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-spice-earth">Leads Management</h1>
          <p className="text-muted-foreground">Manage and track your customer leads.</p>
        </div>
        <Button onClick={downloadExcel} className="bg-spice-paprika hover:bg-spice-paprika/90">
          <Download className="h-4 w-4 mr-2" />
          Export to Excel
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              {stats.total}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Contacted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.contacted}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Qualified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.qualified}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Converted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.converted}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("all")}
            >
              All Leads
            </Button>
            <Button
              variant={selectedStatus === "new" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("new")}
            >
              New
            </Button>
            <Button
              variant={selectedStatus === "contacted" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("contacted")}
            >
              Contacted
            </Button>
            <Button
              variant={selectedStatus === "qualified" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("qualified")}
            >
              Qualified
            </Button>
            <Button
              variant={selectedStatus === "converted" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("converted")}
            >
              Converted
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leads ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredLeads.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1" />
                          {lead.email}
                        </div>
                        {lead.phone && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Phone className="h-3 w-3 mr-1" />
                            {lead.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {lead.message ? (
                        <div className="flex items-start">
                          <MessageSquare className="h-3 w-3 mr-1 mt-1 flex-shrink-0" />
                          <span className="text-sm line-clamp-2">{lead.message}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">No message</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{lead.source}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(lead.status)}</TableCell>
                    <TableCell>{format(parseISO(lead.created_at), "MMM dd, yyyy")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <div className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No leads found</p>
                <p className="text-sm">
                  {selectedStatus === "all" 
                    ? "Leads will appear here when customers contact you" 
                    : `No ${selectedStatus} leads found`}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsManagement;
