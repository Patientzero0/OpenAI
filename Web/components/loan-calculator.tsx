"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, Info, TrendingDown } from "lucide-react"
import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts"

interface BankRate {
  name: string
  rate: number
  minAmount: number
  maxAmount: number
  tenure: string
  processingFee: number
  color: string
}

interface LoanCalculation {
  bank: string
  monthlyEMI: number
  totalAmount: number
  totalInterest: number
  processingFee: number
  rate: number
  color: string
}

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("500000")
  const [loanYears, setLoanYears] = useState("5")
  const [bankRates, setBankRates] = useState<BankRate[]>([])
  const [calculations, setCalculations] = useState<LoanCalculation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [amortizationData, setAmortizationData] = useState<any[]>([])
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const [showComparison, setShowComparison] = useState(false)

  // Fetch bank rates on component mount
  useEffect(() => {
    const fetchBankRates = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get-bank-loan-rates", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        if (data.banks && Array.isArray(data.banks)) {
          setBankRates(data.banks)
        } else {
          throw new Error("Invalid data format")
        }
      } catch (error) {
        console.warn("Backend unavailable, using default bank rates")
        // Use default rates if backend fails
        setBankRates(DEFAULT_BANK_RATES)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBankRates()
  }, [])

  // Calculate loan details whenever amount, years, or rates change
  useEffect(() => {
    if (bankRates.length === 0) return

    const amount = Number(loanAmount) || 0
    const years = Number(loanYears) || 0
    const months = years * 12

    if (amount <= 0 || months <= 0) {
      setCalculations([])
      return
    }

    const newCalculations: LoanCalculation[] = bankRates.map((bank) => {
      const monthlyRate = bank.rate / 100 / 12
      const monthlyEMI =
        amount *
        (monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
      const totalAmount = monthlyEMI * months
      const totalInterest = totalAmount - amount
      const processingFee = (amount * bank.processingFee) / 100

      return {
        bank: bank.name,
        monthlyEMI: isNaN(monthlyEMI) ? 0 : monthlyEMI,
        totalAmount: isNaN(totalAmount) ? 0 : totalAmount,
        totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
        processingFee,
        rate: bank.rate,
        color: bank.color,
      }
    })

    setCalculations(newCalculations)

    // Generate amortization schedule for selected bank or first bank
    const bankForAmortization = selectedBank
      ? newCalculations.find((c) => c.bank === selectedBank)
      : newCalculations[0]

    if (bankForAmortization) {
      generateAmortizationSchedule(
        amount,
        bankForAmortization.rate,
        months,
        bankForAmortization.monthlyEMI
      )
    }
  }, [loanAmount, loanYears, bankRates, selectedBank])

  const generateAmortizationSchedule = (
    principal: number,
    annualRate: number,
    months: number,
    monthlyEMI: number
  ) => {
    const monthlyRate = annualRate / 100 / 12
    let balance = principal
    const schedule = []

    for (let month = 1; month <= Math.min(months, 60); month++) {
      const interestPayment = balance * monthlyRate
      const principalPayment = monthlyEMI - interestPayment
      balance -= principalPayment

      schedule.push({
        month,
        balance: Math.max(0, balance),
        principal: principalPayment,
        interest: interestPayment,
      })
    }

    setAmortizationData(schedule)
  }

  const bestRateLoan = calculations.length > 0 ? calculations[0] : null
  const lowestEMILoan = calculations.length > 0 
    ? calculations.reduce((min, loan) =>
        loan.monthlyEMI < min.monthlyEMI ? loan : min
      )
    : null

  return (
    <div className="space-y-6">
      {/* Loan Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <span>Loan Calculator</span>
          </CardTitle>
          <CardDescription>
            Enter loan details to see interest rates from different banks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Loan Amount (₹)</label>
              <Input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="500000"
                min="100000"
                step="100000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Repayment Period (Years)</label>
              <Input
                type="number"
                value={loanYears}
                onChange={(e) => setLoanYears(e.target.value)}
                placeholder="5"
                min="1"
                max="30"
                step="1"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={() => setShowComparison(!showComparison)}
                className="w-full"
                variant="outline"
              >
                {showComparison ? "Hide Comparison" : "Compare Banks"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bank Rates Summary */}
      {!isLoading && calculations.length > 0 && (
        <>
          {/* Best Rate Banner */}
          {bestRateLoan && (
            <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
              <Info className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700 dark:text-green-300">
                Best interest rate: <strong>{bestRateLoan.rate}% per annum</strong> from{" "}
                <strong>{bestRateLoan.bank}</strong>
              </AlertDescription>
            </Alert>
          )}

          {/* Banks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {calculations.map((loan, index) => (
              <motion.div
                key={loan.bank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all ${
                    selectedBank === loan.bank
                      ? "ring-2 ring-primary shadow-lg"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedBank(loan.bank)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{loan.bank}</CardTitle>
                      <Badge
                        style={{
                          backgroundColor: loan.color,
                        }}
                        className="text-white"
                      >
                        {loan.rate}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Monthly EMI</div>
                      <div className="text-2xl font-bold">
                        ₹{loan.monthlyEMI.toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-muted-foreground">Total Interest</div>
                        <div className="font-semibold">
                          ₹{loan.totalInterest.toLocaleString("en-IN", {
                            maximumFractionDigits: 0,
                          })}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Processing Fee</div>
                        <div className="font-semibold">
                          ₹{loan.processingFee.toLocaleString("en-IN", {
                            maximumFractionDigits: 0,
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="text-sm text-muted-foreground">Total Amount</div>
                      <div className="text-xl font-bold">
                        ₹{(loan.totalAmount + loan.processingFee).toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Comparison Chart */}
          {showComparison && (
            <Card>
              <CardHeader>
                <CardTitle>EMI Comparison</CardTitle>
                <CardDescription>Monthly payment across banks</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={calculations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bank" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) =>
                        `₹${Number(value).toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}`
                      }
                    />
                    <Bar dataKey="monthlyEMI" name="Monthly EMI" fill="#8884d8">
                      {calculations.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {/* Amortization Schedule */}
          {selectedBank && amortizationData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingDown className="h-5 w-5" />
                  <span>Loan Balance Over Time - {selectedBank}</span>
                </CardTitle>
                <CardDescription>
                  Principal repayment and outstanding balance (showing first 5 years)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={amortizationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" label={{ value: "Month", position: "right", offset: 0 }} />
                    <YAxis
                      label={{
                        value: "Balance (₹)",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip
                      formatter={(value) =>
                        `₹${Number(value).toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}`
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="#15803d"
                      strokeWidth={2}
                      name="Outstanding Balance"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {/* Summary Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Loan Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1 p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
                  <div className="text-sm text-muted-foreground">Loan Amount</div>
                  <div className="text-2xl font-bold">
                    ₹{Number(loanAmount).toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="space-y-1 p-4 rounded-lg bg-purple-50 dark:bg-purple-950">
                  <div className="text-sm text-muted-foreground">Repayment Period</div>
                  <div className="text-2xl font-bold">{loanYears} Years</div>
                </div>
                <div className="space-y-1 p-4 rounded-lg bg-green-50 dark:bg-green-950">
                  <div className="text-sm text-muted-foreground">Lowest Monthly EMI</div>
                  <div className="text-2xl font-bold">
                    ₹{lowestEMILoan?.monthlyEMI.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    }) || "0"}
                  </div>
                  <div className="text-xs text-muted-foreground">{lowestEMILoan?.bank || "-"}</div>
                </div>
                <div className="space-y-1 p-4 rounded-lg bg-orange-50 dark:bg-orange-950">
                  <div className="text-sm text-muted-foreground">Best Interest Rate</div>
                  <div className="text-2xl font-bold">{bestRateLoan?.rate}%</div>
                  <div className="text-xs text-muted-foreground">{bestRateLoan?.bank}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {isLoading && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="animate-spin">
                <CreditCard className="h-8 w-8 mx-auto text-primary" />
              </div>
              <p className="mt-4 text-muted-foreground">Loading bank rates...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Default bank rates (fallback if backend is not available)
const DEFAULT_BANK_RATES: BankRate[] = [
  {
    name: "HDFC Bank",
    rate: 7.5,
    minAmount: 100000,
    maxAmount: 50000000,
    tenure: "1-30 years",
    processingFee: 0.5,
    color: "#F44236",
  },
  {
    name: "ICICI Bank",
    rate: 7.8,
    minAmount: 100000,
    maxAmount: 50000000,
    tenure: "1-30 years",
    processingFee: 0.5,
    color: "#2196F3",
  },
  {
    name: "SBI",
    rate: 7.3,
    minAmount: 100000,
    maxAmount: 50000000,
    tenure: "1-30 years",
    processingFee: 0.4,
    color: "#1976D2",
  },
  {
    name: "Axis Bank",
    rate: 7.6,
    minAmount: 100000,
    maxAmount: 50000000,
    tenure: "1-30 years",
    processingFee: 0.5,
    color: "#FF6F00",
  },
  {
    name: "Kotak Mahindra",
    rate: 7.9,
    minAmount: 150000,
    maxAmount: 50000000,
    tenure: "1-30 years",
    processingFee: 0.6,
    color: "#D32F2F",
  },
  {
    name: "IndusInd Bank",
    rate: 7.4,
    minAmount: 100000,
    maxAmount: 50000000,
    tenure: "1-30 years",
    processingFee: 0.5,
    color: "#0288D1",
  },
]
