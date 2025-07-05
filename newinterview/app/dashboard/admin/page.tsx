"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  Search,
  MoreHorizontal,
  UserPlus,
  Calendar,
  ArrowUpRight,
  MessageSquare,
  UserCheck,
  Filter,
  RefreshCcw,
} from 'lucide-react';

// Define user interface
interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  image?: string | null;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Check if user is authenticated and has admin role
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to access the admin dashboard',
        variant: 'destructive',
      });
      router.push('/dashboard');
    }
  }, [status, session, router, toast]);

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        // For this demo, we'll use the mock database directly
        // In a real app, this would be an API call to get users
        const dbUsers = [
          {
            id: 'admin-1',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin',
            createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ];

        setUsers(dbUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch users',
          variant: 'destructive',
        });
        setLoading(false);
      }
    };

    if (status === 'authenticated' && session?.user?.role === 'admin') {
      fetchUsers();
    }
  }, [status, session, toast]);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage users and system settings
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">12%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Interviews</p>
                <p className="text-3xl font-bold">128</p>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-full">
                <MessageSquare className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">8%</span>
              <span>more than previous</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Today</p>
                <p className="text-3xl font-bold">24</p>
              </div>
              <div className="p-2 bg-green-500/10 rounded-full">
                <UserCheck className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">18%</span>
              <span>increase in activity</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Registered Users</CardTitle>
              <CardDescription>
                Manage all registered users in the system
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setUsers([...users])}>
                <RefreshCcw className="h-4 w-4" />
              </Button>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" /> Add User
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Loading users...
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.image || undefined} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.role === 'admin' ? (
                          <Badge className="bg-purple-500">Admin</Badge>
                        ) : (
                          <Badge variant="outline">User</Badge>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
