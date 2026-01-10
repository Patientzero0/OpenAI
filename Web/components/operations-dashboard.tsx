"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Package,
  Truck,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  MapPin,
  Brain,
  Activity,
  Wand,
  Flag,
  Edit2,
  Save,
  X,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data for demonstration
const inventoryData = [
  { category: "Electronics", current: 85, minimum: 50, maximum: 200, status: "good" },
  { category: "Clothing", current: 32, minimum: 40, maximum: 150, status: "low" },
  { category: "Home & Garden", current: 15, minimum: 25, maximum: 100, status: "critical" },
  { category: "Books", current: 120, minimum: 30, maximum: 180, status: "good" },
  { category: "Sports", current: 45, minimum: 35, maximum: 120, status: "good" },
]

const supplierPerformance = [
  { name: "ABC Suppliers", reliability: 95, avgDelay: 1.2, totalOrders: 45, onTime: 43 },
  { name: "XYZ Trading", reliability: 88, avgDelay: 2.8, totalOrders: 32, onTime: 28 },
  { name: "Global Imports", reliability: 92, avgDelay: 1.8, totalOrders: 28, onTime: 26 },
  { name: "Local Vendors", reliability: 78, avgDelay: 4.2, totalOrders: 22, onTime: 17 },
  { name: "Premium Supplies", reliability: 96, avgDelay: 0.8, totalOrders: 38, onTime: 37 },
]

const employeeData = [
  { name: "Rajesh Kumar", role: "Store Manager", status: "present", shift: "Morning", hours: 8.5 },
  { name: "Priya Sharma", role: "Sales Associate", status: "present", shift: "Morning", hours: 8.0 },
  { name: "Amit Patel", role: "Inventory Clerk", status: "absent", shift: "Evening", hours: 0 },
  { name: "Sneha Gupta", role: "Customer Service", status: "present", shift: "Evening", hours: 7.5 },
  { name: "Vikram Singh", role: "Delivery Executive", status: "present", shift: "Full Day", hours: 9.0 },
]

const monthlyOperations = [
  { month: "Jan", orders: 245, deliveries: 238, returns: 12, efficiency: 97 },
  { month: "Feb", orders: 289, deliveries: 285, returns: 8, efficiency: 98 },
  { month: "Mar", orders: 312, deliveries: 305, returns: 15, efficiency: 95 },
  { month: "Apr", orders: 356, deliveries: 348, returns: 18, efficiency: 94 },
  { month: "May", orders: 398, deliveries: 392, returns: 14, efficiency: 96 },
  { month: "Jun", orders: 445, deliveries: 441, returns: 9, efficiency: 98 },
]

const deliveryStatus = [
  { name: "On Time", value: 78, color: "#15803d" },
  { name: "Delayed", value: 15, color: "#ea580c" },
  { name: "Pending", value: 7, color: "#84cc16" },
]

const recentAlerts = [
  {
    id: 1,
    type: "inventory",
    severity: "high",
    message: "Clothing inventory below minimum threshold",
    time: "2 hours ago",
    action: "Reorder Required",
  },
  {
    id: 2,
    type: "supplier",
    severity: "medium",
    message: "Local Vendors delivery delayed by 3 days",
    time: "4 hours ago",
    action: "Follow Up",
  },
  {
    id: 3,
    type: "employee",
    severity: "low",
    message: "Amit Patel marked absent for evening shift",
    time: "6 hours ago",
    action: "Find Cover",
  },
  {
    id: 4,
    type: "delivery",
    severity: "medium",
    message: "5 deliveries pending for today",
    time: "1 hour ago",
    action: "Prioritize",
  },
]

import { useState, useEffect } from "react"

export function OperationsDashboard() {
  // --- Inventory State ---
  const [inventory, setInventory] = useState(inventoryData)
  const [editingInventoryId, setEditingInventoryId] = useState<number | null>(null)
  const [editInventoryValues, setEditInventoryValues] = useState<{
    [key: number]: { current: number; maximum: number }
  }>({})

  // --- Employee State ---
  const [employees, setEmployees] = useState(employeeData)
  const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>(null)
  const [editEmployeeValues, setEditEmployeeValues] = useState<{
    [key: number]: { status: string; hours: number }
  }>({})

  const totalInventoryValue = 2850000
  const lowStockItems = inventory.filter((item) => item.status === "low" || item.status === "critical").length
  const avgSupplierReliability = Math.round(
    supplierPerformance.reduce((acc, supplier) => acc + supplier.reliability, 0) / supplierPerformance.length,
  )
  const presentEmployees = employees.filter((emp) => emp.status === "present").length
  const totalEmployees = employees.length

  // --- AI Operations Insights State ---
  const [operationsInsight, setOperationsInsight] = useState("");
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);
  const [insightQuestion, setInsightQuestion] = useState("Provide a summary of the operational health and recommendations.");

  // Handle inventory current level update
  const handleInventoryCurrentChange = (index: number, newCurrent: number) => {
    const item = inventory[index]
    if (newCurrent <= item.maximum) {
      setEditInventoryValues((prev) => ({
        ...prev,
        [index]: {
          current: newCurrent,
          maximum: editInventoryValues[index]?.maximum || item.maximum,
        },
      }))
    }
  }

  // Handle inventory max level update
  const handleInventoryMaxChange = (index: number, newMax: number) => {
    setEditInventoryValues((prev) => ({
      ...prev,
      [index]: {
        current: editInventoryValues[index]?.current || inventory[index].current,
        maximum: newMax,
      },
    }))
  }

  // Save inventory changes
  const saveInventoryChanges = (index: number) => {
    const values = editInventoryValues[index]
    if (values) {
      const updatedInventory = [...inventory]
      updatedInventory[index] = {
        ...updatedInventory[index],
        current: values.current,
        maximum: values.maximum,
        status:
          values.current >= updatedInventory[index].minimum * 1.5
            ? "good"
            : values.current >= updatedInventory[index].minimum
              ? "low"
              : "critical",
      }
      setInventory(updatedInventory)
    }
    setEditingInventoryId(null)
  }

  // Handle employee status/hours update
  const handleEmployeeStatusChange = (index: number, newStatus: string) => {
    setEditEmployeeValues((prev) => ({
      ...prev,
      [index]: {
        status: newStatus,
        hours: editEmployeeValues[index]?.hours || employees[index].hours,
      },
    }))
  }

  const handleEmployeeHoursChange = (index: number, newHours: number) => {
    setEditEmployeeValues((prev) => ({
      ...prev,
      [index]: {
        status: editEmployeeValues[index]?.status || employees[index].status,
        hours: newHours,
      },
    }))
  }

  // Save employee changes
  const saveEmployeeChanges = (index: number) => {
    const values = editEmployeeValues[index]
    if (values) {
      const updatedEmployees = [...employees]
      updatedEmployees[index] = {
        ...updatedEmployees[index],
        status: values.status,
        hours: values.hours,
      }
      setEmployees(updatedEmployees)
    }
    setEditingEmployeeId(null)
  }

  useEffect(() => {
    const fetchInitialInsight = async () => {
      setIsLoadingInsight(true);
      try {
        const response = await fetch("http://localhost:8000/api/generate-operations-insight", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: {
              inventoryData: inventory,
              supplierPerformance,
              employeeData: employees,
              monthlyOperations,
              deliveryStatus,
              recentAlerts,
            },
            question: insightQuestion,
          }),
        });
        const result = await response.json();
        setOperationsInsight(result.insight);
      } catch (error) {
        setOperationsInsight("Failed to fetch operations insight. Please ensure the backend is running.");
      } finally {
        setIsLoadingInsight(false);
      }
    };
    fetchInitialInsight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      {/* Critical Alerts */}
      {lowStockItems > 0 && (
        <Alert className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800 dark:text-red-200">Inventory Alert</AlertTitle>
          <AlertDescription className="text-red-700 dark:text-red-300">
            {lowStockItems} product categories are below minimum stock levels. Immediate reordering required.
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalInventoryValue / 100000).toFixed(1)}L</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {lowStockItems} items low stock
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supplier Reliability</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSupplierReliability}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +3% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff Attendance</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {presentEmployees}/{totalEmployees}
            </div>
            <p className="text-xs text-muted-foreground">
              {((presentEmployees / totalEmployees) * 100).toFixed(0)}% present today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operational Efficiency</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2% from last month
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Inventory Status
            <Button variant="outline" size="sm">
              <Package className="h-4 w-4 mr-2" />
              Manage Stock
            </Button>
          </CardTitle>
          <CardDescription>Current stock levels across product categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventory.map((item, index) => (
              <div key={index} className="space-y-2 p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{item.category}</span>
                    <Badge
                      variant={item.status === "good" ? "default" : item.status === "low" ? "secondary" : "destructive"}
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingInventoryId(editingInventoryId === index ? null : index)
                      if (editingInventoryId !== index) {
                        setEditInventoryValues((prev) => ({
                          ...prev,
                          [index]: { current: item.current, maximum: item.maximum },
                        }))
                      }
                    }}
                  >
                    {editingInventoryId === index ? <X className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                  </Button>
                </div>

                {editingInventoryId === index ? (
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`current-${index}`} className="text-xs">
                          Current Units
                        </Label>
                        <Input
                          id={`current-${index}`}
                          type="number"
                          min="0"
                          max={editInventoryValues[index]?.maximum || item.maximum}
                          value={editInventoryValues[index]?.current || item.current}
                          onChange={(e) =>
                            handleInventoryCurrentChange(index, parseInt(e.target.value) || 0)
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`max-${index}`} className="text-xs">
                          Max Level
                        </Label>
                        <Input
                          id={`max-${index}`}
                          type="number"
                          min={item.minimum}
                          value={editInventoryValues[index]?.maximum || item.maximum}
                          onChange={(e) =>
                            handleInventoryMaxChange(index, parseInt(e.target.value) || item.maximum)
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => saveInventoryChanges(index)}
                        className="flex-1"
                      >
                        <Save className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingInventoryId(null)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">
                        {editInventoryValues[index]?.current || item.current} / {editInventoryValues[index]?.maximum || item.maximum} units
                      </span>
                    </div>
                    <Progress
                      value={
                        ((editInventoryValues[index]?.current || item.current) /
                          (editInventoryValues[index]?.maximum || item.maximum)) *
                        100
                      }
                      className={`h-2 ${
                        item.status === "good"
                          ? "text-green-600"
                          : item.status === "low"
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Min: {item.minimum}</span>
                      <span>Max: {editInventoryValues[index]?.maximum || item.maximum}</span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Operations */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Operations Overview</CardTitle>
            <CardDescription>Orders, deliveries, and efficiency trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyOperations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#15803d" strokeWidth={2} name="Orders" />
                <Line type="monotone" dataKey="deliveries" stroke="#84cc16" strokeWidth={2} name="Deliveries" />
                <Line type="monotone" dataKey="efficiency" stroke="#ea580c" strokeWidth={2} name="Efficiency %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Delivery Status */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Performance</CardTitle>
            <CardDescription>Current delivery status distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deliveryStatus}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {deliveryStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Supplier Performance & Employee Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supplier Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Supplier Performance
              <Button variant="outline" size="sm">
                <Truck className="h-4 w-4 mr-2" />
                Manage Suppliers
              </Button>
            </CardTitle>
            <CardDescription>Reliability scores and delivery performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supplierPerformance.map((supplier, index) => (
                <div key={index} className={`p-3 border rounded-lg ${supplier.avgDelay > 2 ? 'border-red-300 bg-red-50 dark:bg-red-950' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{supplier.name}</div>
                      {supplier.avgDelay > 2 && (
                        <div className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-md">
                          <Flag className="h-3 w-3" />
                          <span className="text-xs font-medium">Flagged</span>
                        </div>
                      )}
                    </div>
                    <Badge
                      variant={
                        supplier.reliability >= 90
                          ? "default"
                          : supplier.reliability >= 80
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {supplier.reliability}% reliable
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Avg Delay</div>
                      <div className={`font-medium ${supplier.avgDelay > 2 ? 'text-red-600' : ''}`}>
                        {supplier.avgDelay} days
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Total Orders</div>
                      <div className="font-medium">{supplier.totalOrders}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">On Time</div>
                      <div className="font-medium">
                        {supplier.onTime}/{supplier.totalOrders}
                      </div>
                    </div>
                  </div>
                  <Progress value={supplier.reliability} className="mt-2 h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Employee Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Employee Tracking
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Manage Staff
              </Button>
            </CardTitle>
            <CardDescription>Current shift status and attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employees.map((employee, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  {editingEmployeeId === index ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex-1">
                          <div className="font-medium text-sm mb-2">{employee.name}</div>
                          <div className="text-xs text-muted-foreground">{employee.role}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor={`status-${index}`} className="text-xs">
                            Status
                          </Label>
                          <Select
                            value={editEmployeeValues[index]?.status || employee.status}
                            onValueChange={(value) => handleEmployeeStatusChange(index, value)}
                          >
                            <SelectTrigger id={`status-${index}`} className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="present">Present</SelectItem>
                              <SelectItem value="absent">Absent</SelectItem>
                              <SelectItem value="leave">On Leave</SelectItem>
                              <SelectItem value="half-day">Half Day</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor={`hours-${index}`} className="text-xs">
                            Hours Worked
                          </Label>
                          <Input
                            id={`hours-${index}`}
                            type="number"
                            step="0.5"
                            min="0"
                            max="12"
                            value={editEmployeeValues[index]?.hours || employee.hours}
                            onChange={(e) =>
                              handleEmployeeHoursChange(index, parseFloat(e.target.value) || 0)
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => saveEmployeeChanges(index)}
                          className="flex-1"
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingEmployeeId(null)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <div
                          className={`p-2 rounded-full ${
                            employee.status === "present"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {employee.status === "present" ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{employee.name}</div>
                          <div className="text-xs text-muted-foreground">{employee.role}</div>
                        </div>
                      </div>
                      <div className="text-right mr-3">
                        <div className="text-sm font-medium">{employee.shift}</div>
                        <div className="text-xs text-muted-foreground">
                          {employee.hours}h {employee.status === "present" ? "worked" : "absent"}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingEmployeeId(index)
                          setEditEmployeeValues((prev) => ({
                            ...prev,
                            [index]: { status: employee.status, hours: employee.hours },
                          }))
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Recent Alerts & Notifications
            <Badge variant="outline">{recentAlerts.length} active</Badge>
          </CardTitle>
          <CardDescription>Important operational updates requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 border rounded-lg ${
                  alert.severity === "high"
                    ? "border-red-200 bg-red-50 dark:bg-red-950"
                    : alert.severity === "medium"
                      ? "border-yellow-200 bg-yellow-50 dark:bg-yellow-950"
                      : "border-blue-200 bg-blue-50 dark:bg-blue-950"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-1 rounded-full ${
                        alert.severity === "high"
                          ? "bg-red-100 text-red-600"
                          : alert.severity === "medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {alert.type === "inventory" && <Package className="h-3 w-3" />}
                      {alert.type === "supplier" && <Truck className="h-3 w-3" />}
                      {alert.type === "employee" && <Users className="h-3 w-3" />}
                      {alert.type === "delivery" && <MapPin className="h-3 w-3" />}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{alert.message}</div>
                      <div className="text-xs text-muted-foreground flex items-center space-x-2">
                        <Clock className="h-3 w-3" />
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    {alert.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Operations Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>AI Operations Insights</span>
          </CardTitle>
          <CardDescription>Intelligent recommendations for operational efficiency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoadingInsight ? (
              <div className="flex items-center space-x-2 text-blue-700 animate-pulse">
                <Wand className="h-4 w-4 animate-spin" />
                <span>Generating AI insights...</span>
              </div>
            ) : (
              <div className="whitespace-pre-line text-sm text-gray-800 dark:text-gray-200">
                {operationsInsight}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
