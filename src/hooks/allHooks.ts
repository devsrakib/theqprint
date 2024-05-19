import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useRef } from 'react';
const mainUrl = 'https://api.theqprint.com/api/v1';

export const useBrand = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/brand`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  return { data, setData, isLoading, err, setRefetch };
};
export const useBrandQuery = (brand: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/brand?${brand}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  return { data, setData, isLoading, err, setRefetch };
};
export const useCarousel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/promotions/slider`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  return { data, setData, isLoading, err, setRefetch };
};
export const useProduct = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/product`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  return { data, setData, isLoading, err, setRefetch };
};
export const useNotification = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/notification/me`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  return { data, setData, isLoading, err, setRefetch };
};
// export const useProductQuery = (query:any) => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [data, setData] = useState<any>([]);
//     const [err, setErr] = useState(null);
//     const [refetch, setRefetch] = useState(0);

//     useEffect(() => {
//         const fetchData = async () => {
//             setIsLoading(true);
//             try {
//                 const token = await AsyncStorage.getItem('accessToken');

//                 const response = await fetch(`${mainUrl}/product?${query}`, {
//                     headers: {
//                         'Authorization': `bearer ${token}`
//                     }
//                 });
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const jsonData = await response.json();
//                 setData(jsonData);
//             } catch (error:any) {
//                 setErr(error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchData();
//     }, [ refetch]);

//     return { data, setData, isLoading, err, setRefetch };
// };

// Modify the useProductQuery hook

export const useProductQuery = (query: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(null);
  const [refetchKey, setRefetchKey] = useState(0); // Key to trigger refetch
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await fetch(`${mainUrl}/product?${query}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
      setError(null);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const refetchData = () => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      setRefetchKey((prevKey) => prevKey + 1); // Increment key to trigger refetch after debounce
    }, 500); // Adjust the debounce delay as needed (e.g., 500 milliseconds)
  };

  useEffect(() => {
    fetchData();
  }, [query, refetchKey]); // Refetch whenever query or refetchKey changes

  return { data, isLoading, error, refetchData };
};

export const useSortedProduct = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/product?sortBy=totalSoldQuantity&limit=10`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  return { data, setData, isLoading, err, setRefetch };
};
export const useSearch = (search: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/product/searchTerm=${search}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  return { data, setData, isLoading, err, setRefetch };
};
export const useUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/user/me`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);
  return { data, setData, isLoading, err, setRefetch };
};
export const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/user/update`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  return { data, setData, isLoading, err, setRefetch };
};
export const useGetShippingAddress = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/user-address/me`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);
  return { data, setData, isLoading, err, setRefetch };
};
export const useReview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/online-order`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  return { data, setData, isLoading, err, setRefetch };
};
export const useReviewHistory = (id: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/review?reviewer.userId=${id}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  return { data, setData, isLoading, err, setRefetch };
};
export const useGetProductById = (id: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/product/${id}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, setData, isLoading, err, setRefetch };
};
export const useGetShippingQuery = (d: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/user-address/me?${d}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);
  return { data, setData, isLoading, err, setRefetch };
};
export const useContacts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/settings/social-media`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  return { data, setData, isLoading, err, setRefetch };
};
export const useGetDeliveryState = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/settings/shipping-charge`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);
  return { data, setData, isLoading, err, setRefetch };
};
export const useGetOnlineOrderById = (id: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/online-order/${id}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  return { data, setData, isLoading, err, setRefetch };
};
export const useGetOnlineOrder = (query: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/online-order?${query}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  return { data, setData, isLoading, err, setRefetch };
};
export const useGetOnlineReveiwById = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(
          `${mainUrl}/online-order?orderStatus.status=Delivered&buyer.userId=${id}`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  return { data, setData, isLoading, err, setRefetch };
};
export const useCancelOrderById = (id: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/online-order/${id}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  return { data, setData, isLoading, err, setRefetch };
};
// export const useGetOnlineOrder = (query: any) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [data, setData] = useState<any>([]);
//   const [err, setErr] = useState(null);
//   const [refetch, setRefetch] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const token = await AsyncStorage.getItem('accessToken');

//         const response = await fetch(`${mainUrl}/online-order/${query}`, {
//           headers: {
//             Authorization: `bearer ${token}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const jsonData = await response.json();
//         setData(jsonData);
//       } catch (error: any) {
//         setErr(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [refetch]);

//   return { data, setData, isLoading, err, setRefetch };
// };
export const useGetAllPrinting = (query: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/printing-request?${query}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  return { data, setData, isLoading, err, setRefetch };
};
export const useGetAllPrintingById = (id: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/printing-request/${id}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  return { data, setData, isLoading, err, setRefetch };
};
export const useGetCart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/cart/me`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  return { data, setData, isLoading, err, setRefetch };
};
export const useGetFavourite = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/wishlist/me`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  return { data, setData, isLoading, err, setRefetch };
};
export const useGetPrinting = (query: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/printing-setup?${query}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  return { data, setData, isLoading, err, setRefetch };
};
export const useGetReviewById = (query: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  // const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${mainUrl}/review?${query}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return { data, setData, isLoading, err };
};
export const useUpdateCart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  // const [refetch, setRefetch] = useState(0);

  const updateCart = async (updateData: { products: Array<{}> }) => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('accessToken');

      const response = await fetch('https://api.theqprint.com/api/v1/cart/add', {
        method: 'POST',
        body: JSON.stringify(updateData),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();

      setData(jsonData);
    } catch (error: any) {
      setErr(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { data, updateCart, isLoading, err };
};

// export const useBrand = () => useFetchData('brand');
// export const useBrandQuery = (brand:any) => useFetchData(`brand?${brand}`);
// export const useCarousel = () => useFetchData('promotions/slider');

// export const useProduct = () => useFetchData('product');
// export const useNotification = () => useFetchData('notification/me');
// export const useProductQuery = (product:any) => useFetchData(`product?${product}`);
// export const useSortedProduct = () => useFetchData('product?sortBy=totalSoldQuantity&limit=10');
// export const useSearch = (search: string) => useFetchData(`product/searchTerm=${search}`);
// export const useUser = () => useFetchData(`user/me`);
// export const useUpdateUser = () => useFetchData(`user/update`);
// export const useGetShippingAddress = () => useFetchData(`user-address/me`);
// export const useReview = () => useFetchData(`online-order`);
// export const useReviewHistory = (id:any) => useFetchData(`review/${id}`);
// export const useReviewHistory = (id:any) => useFetchData(`review?reviewer.userId=${id}`);
// export const useContacts = () => useFetchData(`settings/social-media`);
// export const useGetProductById = (id:any) => useFetchData(`product/${id}`);
// export const useGetShippingQuery = (data:any) => useFetchData(`user-address/me?${data}`);
// export const useGetDeliveryState = () => useFetchData(`settings/shipping-charge`);
// export const useGetOnlineOrderById = (id:string) => useFetchData(`online-order/${id}`);
// export const useGetOnlineReveiwById = (id:string) => useFetchData(`online-order?buyer.userId=${id}`);
// export const useCancelOrderById = (id:string) => useFetchData(`online-order/${id}`);
// export const useGetAllPrinting = (data:any) => useFetchData(`printing-request?${data}`);
// export const useGetFavourite = () => useFetchData(`wishlist/me`);
// export const useGetCart = () => useFetchData(`cart/me`);
// export const useGetReviewById = (query:any) => useFetchData(`/review?${query}`);
