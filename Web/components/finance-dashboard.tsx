"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  DollarSign,
  FileText,
  TrendingDown,
  TrendingUp,
  Calendar,
  Target,
  Brain,
  Wand,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { motion, AnimatePresence } from "framer-motion"

// Sample data for demonstration
const cashflowData = [
  { month: "Jan", income: 45000, expenses: 32000, net: 13000 },
  { month: "Feb", income: 52000, expenses: 35000, net: 17000 },
  { month: "Mar", income: 48000, expenses: 38000, net: 10000 },
  { month: "Apr", income: 61000, expenses: 42000, net: 19000 },
  { month: "May", income: 55000, expenses: 39000, net: 16000 },
  { month: "Jun", income: 67000, expenses: 45000, net: 22000 },
]

const expenseBreakdown = [
  { name: "Inventory", value: 35, color: "#15803d" },
  { name: "Rent", value: 25, color: "#84cc16" },
  { name: "Salaries", value: 20, color: "#ea580c" },
  { name: "Utilities", value: 10, color: "#d1d5db" },
  { name: "Marketing", value: 10, color: "#4b5563" },
]

const recentTransactions = [
  {
    id: 1,
    type: "income",
    description: "Customer Payment - Invoice #1234",
    amount: 15000,
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: 2,
    type: "expense",
    description: "Supplier Payment - ABC Traders",
    amount: -8500,
    date: "2024-01-14",
    status: "completed",
  },
  {
    id: 3,
    type: "income",
    description: "UPI Payment - Order #5678",
    amount: 2300,
    date: "2024-01-14",
    status: "completed",
  },
  { id: 4, type: "expense", description: "Rent Payment", amount: -12000, date: "2024-01-13", status: "completed" },
  {
    id: 5,
    type: "income",
    description: "Bank Transfer - Client ABC",
    amount: 25000,
    date: "2024-01-12",
    status: "pending",
  },
]

const overduePaymentsData = [
  { customer: "Retail Store XYZ", amount: 18500, daysOverdue: 15, invoiceNo: "INV-2024-001" },
  { customer: "Restaurant ABC", amount: 12300, daysOverdue: 8, invoiceNo: "INV-2024-003" },
  { customer: "Office Supplies Ltd", amount: 7800, daysOverdue: 22, invoiceNo: "INV-2023-089" },
]

const originalData = {
  cashflowData,
  expenseBreakdown,
  recentTransactions,
  overduePayments: overduePaymentsData,
}

export function FinanceDashboard() {
  const [whatIfRevenue, setWhatIfRevenue] = useState("")
  const [whatIfExpenses, setWhatIfExpenses] = useState("")
  const [whatIfAnalysis, setWhatIfAnalysis] = useState("")
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false)

  const [financialInsight, setFinancialInsight] = useState("")
  const [isLoadingInsight, setIsLoadingInsight] = useState(false)
  const [insightQuestion, setInsightQuestion] = useState("")
  const [overduePayments, setOverduePayments] = useState(overduePaymentsData)

  const handlePaid = (invoiceNo: string) => {
    setOverduePayments((prev) => prev.filter((p) => p.invoiceNo !== invoiceNo))
  }
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // User-editable financial inputs (persisted to localStorage)
  const [currentCashInput, setCurrentCashInput] = useState("125000")
  const [monthlyRevenueInput, setMonthlyRevenueInput] = useState("67000")
  const [monthlyExpensesInput, setMonthlyExpensesInput] = useState("45000")

  useEffect(() => {
    try {
      const savedCash = localStorage.getItem("currentCash")
      const savedRevenue = localStorage.getItem("monthlyRevenue")
      const savedExpenses = localStorage.getItem("monthlyExpenses")
      if (savedCash) setCurrentCashInput(savedCash)
      if (savedRevenue) setMonthlyRevenueInput(savedRevenue)
      if (savedExpenses) setMonthlyExpensesInput(savedExpenses)
    } catch (e) {
      // ignore storage errors (e.g., SSR or blocked storage)
    }
  }, [])

  // Derived numeric values
  const currentCash = Number(currentCashInput) || 0
  const monthlyRevenue = Number(monthlyRevenueInput) || 0
  const monthlyExpenses = Number(monthlyExpensesInput) || 0
  const netProfit = monthlyRevenue - monthlyExpenses
  const profitMargin = monthlyRevenue > 0 ? ((netProfit / monthlyRevenue) * 100).toFixed(1) : "0.0"

  // Cash runway (months) and a combined financial health score
  const cashRunway = monthlyExpenses > 0 ? Math.floor(currentCash / monthlyExpenses) : Infinity

  const runwayScore = cashRunway > 6 ? 100 : cashRunway > 3 ? 85 : cashRunway > 1 ? 60 : 25
  const profitScore = Number(profitMargin) >= 20 ? 100 : Number(profitMargin) >= 10 ? 80 : Number(profitMargin) >= 0 ? 50 : 20
  const riskScore = Math.round(runwayScore * 0.6 + profitScore * 0.4)
  const riskLevel = riskScore >= 75 ? "green" : riskScore >= 50 ? "yellow" : "red"

  // Persist inputs to localStorage when they change
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem("currentCash", currentCashInput)
        localStorage.setItem("monthlyRevenue", monthlyRevenueInput)
        localStorage.setItem("monthlyExpenses", monthlyExpensesInput)
      } catch (e) {
        // ignore storage errors (e.g., SSR or blocked storage)
      }
    }
  }, [currentCashInput, monthlyRevenueInput, monthlyExpensesInput, isClient])

  const handleGenerateInsight = async () => {
    setIsLoadingInsight(true)
    setFinancialInsight("")
    try {
      const response = await fetch("http://localhost:8000/api/generate-insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: originalData,
          question: insightQuestion,
        }),
      })
      const result = await response.json()
      setFinancialInsight(result.insight)
    } catch (error) {
      setFinancialInsight("Failed to fetch analysis. Please ensure the backend is running.")
    } finally {
      setIsLoadingInsight(false)
    }
  }

  const handleWhatIfAnalysis = async () => {
    setIsLoadingAnalysis(true)
    setWhatIfAnalysis("")
    try {
      const modifiedData = {
        monthlyRevenue: whatIfRevenue,
        monthlyExpenses: whatIfExpenses,
      }
      const response = await fetch("http://localhost:8000/api/what-if-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          original_data: originalData,
          modified_data: modifiedData,
        }),
      })
      const result = await response.json()
      setWhatIfAnalysis(result.analysis)
    } catch (error) {
      setWhatIfAnalysis("Failed to fetch analysis. Please ensure the backend is running.")
    } finally {
      setIsLoadingAnalysis(false)
    }
  }

  useEffect(() => {
    const fetchInitialInsight = async () => {
      setIsLoadingInsight(true)
      try {
        const response = await fetch("http://localhost:8000/api/generate-insight", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: originalData,
            question: "Provide a summary of the financial health.",
          }),
        });
        const result = await response.json();
        setFinancialInsight(result.insight);
      } catch (error) {
        setFinancialInsight("Failed to fetch initial insight. Is the backend running?");
      } finally {
        setIsLoadingInsight(false);
      }
    };
    fetchInitialInsight();
  }, []);

  return (
    <div className="space-y-6">
      {isClient && riskLevel === "yellow" && (
        <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800 dark:text-yellow-200">Cash Flow Warning</AlertTitle>
          <AlertDescription className="text-yellow-700 dark:text-yellow-300">
            Your cash runway is {cashRunway} months. Consider improving collections or reducing expenses.
          </AlertDescription>
        </Alert>
      )}

      {isClient && riskLevel === "red" && (
        <Alert className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800 dark:text-red-200">Critical Cash Flow Alert</AlertTitle>
          <AlertDescription className="text-red-700 dark:text-red-300">
            Urgent: Only {cashRunway} month of cash remaining. Immediate action required.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Cash</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Input
              type="number"
              value={currentCashInput}
              onChange={(e) => setCurrentCashInput(e.target.value)}
              aria-label="Current Cash"
            />
            <p className="text-xs text-muted-foreground mt-2">₹{currentCash.toLocaleString('en-IN')} • {isFinite(cashRunway) ? `${cashRunway} months runway` : "No expenses set"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Input
              type="number"
              value={monthlyRevenueInput}
              onChange={(e) => setMonthlyRevenueInput(e.target.value)}
              aria-label="Monthly Revenue"
            />
            <p className="text-xs text-muted-foreground mt-2">₹{monthlyRevenue.toLocaleString('en-IN')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Input
              type="number"
              value={monthlyExpensesInput}
              onChange={(e) => setMonthlyExpensesInput(e.target.value)}
              aria-label="Monthly Expenses"
            />
            <p className="text-xs text-muted-foreground mt-2">₹{monthlyExpenses.toLocaleString('en-IN')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profitMargin}%</div>
            <p className="text-xs text-muted-foreground">Net profit: ₹{netProfit.toLocaleString('en-IN')}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Financial Health Score</span>
            <Badge variant={riskLevel === "green" ? "default" : riskLevel === "yellow" ? "secondary" : "destructive"}>
              {riskLevel.toUpperCase()}
            </Badge>
          </CardTitle>
          <CardDescription>AI-powered assessment of your business financial stability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Score</span>
              <span className="text-2xl font-bold">{riskScore}/100</span>
            </div>
            <Progress
              value={riskScore}
              className={`h-3 ${riskLevel === "green" ? "text-green-600" : riskLevel === "yellow" ? "text-yellow-600" : "text-red-600"}`}
            />
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium">Cash Flow</div>
                <div
                  className={`text-${riskLevel === "green" ? "green" : riskLevel === "yellow" ? "yellow" : "red"}-600`}
                >
                  {riskLevel === "green" ? "Healthy" : riskLevel === "yellow" ? "Moderate" : "Critical"}
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium">Collections</div>
                <div className="text-yellow-600">Needs Attention</div>
              </div>
              <div className="text-center">
                <div className="font-medium">Expenses</div>
                <div className="text-green-600">Under Control</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>6-Month Cashflow Trend</CardTitle>
            <CardDescription>Income vs Expenses over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cashflowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                <Line type="monotone" dataKey="income" stroke="#15803d" strokeWidth={2} name="Income" />
                <Line type="monotone" dataKey="expenses" stroke="#ea580c" strokeWidth={2} name="Expenses" />
                <Line type="monotone" dataKey="net" stroke="#84cc16" strokeWidth={2} name="Net Profit" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Current month expense distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* What-If Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wand className="h-5 w-5 text-primary" />
            <span>What-If Scenario Analysis</span>
          </CardTitle>
          <CardDescription>Explore the potential impact of financial decisions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Future Monthly Revenue (e.g., 75000)"
              value={whatIfRevenue}
              onChange={(e) => setWhatIfRevenue(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Future Monthly Expenses (e.g., 50000)"
              value={whatIfExpenses}
              onChange={(e) => setWhatIfExpenses(e.target.value)}
            />
          </div>
          <Button onClick={handleWhatIfAnalysis} disabled={isLoadingAnalysis}>
            {isLoadingAnalysis ? "Analyzing..." : "Analyze Scenario"}
          </Button>
          {whatIfAnalysis && (
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border space-y-3">
              {whatIfAnalysis.split('\n').map((line, index) => {
                // Handle section headers (lines that end with ':')
                if (line.trim().endsWith(':')) {
                  return (
                    <div key={index} className="font-semibold text-gray-900 dark:text-gray-100 mt-3 mb-2">
                      {line}
                    </div>
                  );
                }
                // Handle bullet points
                if (line.trim().startsWith('-')) {
                  return (
                    <div key={index} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <span className="flex-shrink-0 mt-1">•</span>
                      <span>{line.trim().substring(1).trim()}</span>
                    </div>
                  );
                }
                // Handle numbered items
                if (/^\d+\./.test(line.trim())) {
                  return (
                    <div key={index} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300 ml-2">
                      <span className="flex-shrink-0">{line.trim().match(/^\d+\./)[0]}</span>
                      <span>{line.trim().replace(/^\d+\./, '').trim()}</span>
                    </div>
                  );
                }
                // Handle regular paragraphs
                if (line.trim()) {
                  return (
                    <p key={index} className="text-sm text-gray-700 dark:text-gray-300">
                      {line}
                    </p>
                  );
                }
                // Empty lines for spacing
                return <div key={index} className="h-1" />;
              })}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Transactions
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardTitle>
            <CardDescription>Latest financial activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${transaction.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{transaction.description}</div>
                      <div className="text-xs text-muted-foreground">{transaction.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                      ₹{Math.abs(transaction.amount).toLocaleString('en-IN')}
                    </div>
                    <Badge variant={transaction.status === "completed" ? "default" : "secondary"} className="text-xs">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Overdue Payments
              <Badge variant="destructive">{overduePayments.length}</Badge>
            </CardTitle>
            <CardDescription>Payments requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <AnimatePresence>
                {overduePayments.map((payment) => (
                  <motion.div
                    key={payment.invoiceNo}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-red-100 text-red-600">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{payment.customer}</div>
                        <div className="text-xs text-muted-foreground">
                          Invoice: {payment.invoiceNo} • {payment.daysOverdue} days overdue
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-red-600">₹{payment.amount.toLocaleString('en-IN')}</div>
                      <div className="flex space-x-2 mt-1">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Send Reminder
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handlePaid(payment.invoiceNo)}
                          className="bg-green-100 text-green-800 hover:bg-green-200"
                        >
                          Paid
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>AI Financial Insights</span>
          </CardTitle>
          <CardDescription>Ask a question to get a real-time analysis of your financial data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="e.g., 'What was my most profitable month?'"
              value={insightQuestion}
              onChange={(e) => setInsightQuestion(e.target.value)}
            />
            <Button onClick={handleGenerateInsight} disabled={isLoadingInsight}>
              {isLoadingInsight ? "..." : "Ask"}
            </Button>
          </div>
          {financialInsight && (
            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200">
              <CardContent className="pt-4">
                <p className="text-sm text-blue-700 dark:text-blue-300 whitespace-pre-wrap">
                  {financialInsight}
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
