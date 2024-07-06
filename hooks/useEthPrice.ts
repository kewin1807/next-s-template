import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchEthPrice = async () => {
  try {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum');
    const info = data[0]
    return info?.current_price || 3500
  }
  catch (error) {
    return 3500
  }
}

const useFetchEth = () => useQuery(
  {
    queryKey: ['fetchETHPrice'],
    queryFn: fetchEthPrice,
    staleTime: 5 * 60 * 1000,
    // cacheTime: 5 * 60 * 1000
  }
)

export default useFetchEth