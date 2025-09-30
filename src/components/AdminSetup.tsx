
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUpdateUserRole } from '@/hooks/useUserRole';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const AdminSetup = () => {
  const [email, setEmail] = useState('');
  const { user } = useAuth();
  const updateUserRole = useUpdateUserRole();
  const { toast } = useToast();

  const handleMakeAdmin = async () => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to perform this action.",
        variant: "destructive",
      });
      return;
    }

    if (email !== user.email) {
      toast({
        title: "Error",
        description: "Email doesn't match your current logged-in email.",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateUserRole.mutateAsync({
        userId: user.id,
        role: 'admin'
      });
      
      toast({
        title: "Success!",
        description: "You are now an admin. Please refresh the page.",
      });
    } catch (error) {
      console.error('Error making user admin:', error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Admin Setup</CardTitle>
        <CardDescription>
          Enter your email to make yourself an admin
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button 
          onClick={handleMakeAdmin}
          disabled={!email || updateUserRole.isPending}
          className="w-full"
        >
          {updateUserRole.isPending ? 'Making Admin...' : 'Make Me Admin'}
        </Button>
        {user?.email && (
          <p className="text-sm text-gray-600">
            Current logged-in email: {user.email}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminSetup;
