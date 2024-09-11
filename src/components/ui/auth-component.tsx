import { useEffect, useState } from 'react';
import { useLoginService } from '@/lib/hooks/services/customer/useLoginService';
import { Navigate } from 'react-router-dom';
import { GetCustomerInfoResponse } from '@/controllers/customer/getCustomerInfo';

type AuthComponentProps = {
  redirect?: string;
  children: React.ReactNode;
};

export const AuthComponent = ({
  children,
  redirect = "/login",
}: AuthComponentProps) => {
  const { getInfoToken } = useLoginService();
  const [customer, setCustomer] = useState<GetCustomerInfoResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      const storedCustomer = getInfoToken();
      if (storedCustomer) {
        setCustomer(storedCustomer);
      } else {
        setCustomer(null);
      }
      setLoading(false);
    };

    fetchCustomer();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!customer) {
    return <Navigate to={redirect} replace />;
  }

  return <>{children}</>;
};
