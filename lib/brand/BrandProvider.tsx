/**
 * Brand Provider - React Context
 *
 * Provides brand configuration to all components
 * Enables multi-brand UI customization
 */

'use client'

import React, { createContext, useContext, useMemo } from 'react'
import { BrandConfig, DEFAULT_BRAND } from './config'

interface BrandContextValue {
  brand: BrandConfig
}

const BrandContext = createContext<BrandContextValue>({
  brand: DEFAULT_BRAND,
})

export function useBrand() {
  const context = useContext(BrandContext)
  if (!context) {
    throw new Error('useBrand must be used within BrandProvider')
  }
  return context
}

interface BrandProviderProps {
  brand: BrandConfig
  children: React.ReactNode
}

export function BrandProvider({ brand, children }: BrandProviderProps) {
  const value = useMemo(() => ({ brand }), [brand])

  return (
    <BrandContext.Provider value={value}>
      {children}
    </BrandContext.Provider>
  )
}

export default BrandProvider
