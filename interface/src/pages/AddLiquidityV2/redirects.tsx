import { Redirect, useParams } from 'react-router-dom'

import AddLiquidityV2 from './index'

export function RedirectDuplicateTokenIdsV2() {
  const { currencyIdA, currencyIdB } = useParams<{ currencyIdA: string; currencyIdB: string }>()

  if (currencyIdA && currencyIdB && currencyIdA.toLowerCase() === currencyIdB.toLowerCase()) {
    return <Redirect to={`/add/v2/${currencyIdA}`} />
  }

  return <AddLiquidityV2 />
}