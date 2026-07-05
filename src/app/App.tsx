// JewelERP Pro — Premium Jewellery ERP Application
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import {
  LayoutDashboard, ShoppingCart, Package, Users, TrendingUp,
  Settings, ChevronRight, ChevronDown, Moon, Sun, Bell,
  Search, LogOut, Menu, X, Plus, Filter, Download, Eye,
  EyeOff, Lock, Mail, Gem, Scale, Coins, Building2,
  Activity, RefreshCw, Calendar, MessageSquare, Brain,
  QrCode, Tag, Wrench, Hammer, Receipt, Banknote, BookOpen,
  BarChart3, Archive, Gift, Percent, Printer, Send, Shield,
  Sparkles, AlertCircle, CheckCircle2, Clock, ArrowUpRight,
  ArrowDownRight, Wallet, Zap, Hash, RotateCcw, User,
  MoreVertical, Edit, Trash2, ArrowRight, Package2,
  IndianRupee, Layers, Phone, Globe, Cpu,
  BarChart2, FileText, CreditCard, ShoppingBag, Truck,
  UserCheck, MapPin, Upload, Star, Database, ChevronLeft,
  Check, Mic, Camera, Landmark, BookMarked, FlaskConical,
} from "lucide-react";

// ─── COLORS ───────────────────────────────────────────────
const GOLD = "#D4AF37";
const GOLD_LIGHT = "#F0D060";
const BLUE = "#3B82F6";
const GREEN = "#10B981";
const RED = "#EF4444";
const PURPLE = "#8B5CF6";
const ORANGE = "#F59E0B";

// ─── MOCK DATA ────────────────────────────────────────────
const monthlySalesData = [
  { month: "Jan", sales: 28.5, purchases: 19.2, profit: 9.3 },
  { month: "Feb", sales: 31.2, purchases: 21.0, profit: 10.2 },
  { month: "Mar", sales: 45.8, purchases: 30.1, profit: 15.7 },
  { month: "Apr", sales: 38.4, purchases: 26.5, profit: 11.9 },
  { month: "May", sales: 42.1, purchases: 28.8, profit: 13.3 },
  { month: "Jun", sales: 52.6, purchases: 35.2, profit: 17.4 },
  { month: "Jul", sales: 48.3, purchases: 32.7, profit: 15.6 },
  { month: "Aug", sales: 55.9, purchases: 37.4, profit: 18.5 },
  { month: "Sep", sales: 61.2, purchases: 41.1, profit: 20.1 },
  { month: "Oct", sales: 72.8, purchases: 48.6, profit: 24.2 },
  { month: "Nov", sales: 89.4, purchases: 59.7, profit: 29.7 },
  { month: "Dec", sales: 98.1, purchases: 65.4, profit: 32.7 },
];

const metalSalesData = [
  { name: "Gold", value: 68.5, color: GOLD },
  { name: "Diamond", value: 18.2, color: "#93C5FD" },
  { name: "Silver", value: 8.3, color: "#C0C0C0" },
  { name: "Platinum", value: 3.1, color: "#E5E4E2" },
  { name: "Others", value: 1.9, color: PURPLE },
];

const customerGrowthData = [
  { month: "Jan", customers: 1240 }, { month: "Feb", customers: 1380 },
  { month: "Mar", customers: 1520 }, { month: "Apr", customers: 1680 },
  { month: "May", customers: 1820 }, { month: "Jun", customers: 1990 },
  { month: "Jul", customers: 2140 }, { month: "Aug", customers: 2380 },
  { month: "Sep", customers: 2540 }, { month: "Oct", customers: 2780 },
  { month: "Nov", customers: 3120 }, { month: "Dec", customers: 3450 },
];

const recentTransactions = [
  { id: "INV-2024-0892", customer: "Priya Sharma", type: "Sale", items: "22K Gold Necklace × 1", amount: 48500, status: "Paid", time: "10:32 AM" },
  { id: "INV-2024-0891", customer: "Rajesh Kumar", type: "Sale", items: "Diamond Ring × 1, Earrings × 1", amount: 125000, status: "Paid", time: "10:15 AM" },
  { id: "INV-2024-0890", customer: "Meena Patel", type: "Estimate", items: "Gold Bangle Set × 2", amount: 38200, status: "Pending", time: "9:48 AM" },
  { id: "INV-2024-0889", customer: "Sunita Gupta", type: "Sale", items: "Silver Anklet × 1", amount: 4200, status: "Paid", time: "9:30 AM" },
  { id: "INV-2024-0888", customer: "Arun Mehta", type: "Return", items: "22K Ring × 1", amount: -12500, status: "Refunded", time: "9:12 AM" },
  { id: "PO-2024-0234", customer: "Mahalaxmi Jewellers", type: "Purchase", items: "Raw Gold 50gm", amount: 295000, status: "GRN Done", time: "9:00 AM" },
];

const products = [
  { id: 1, sku: "GN-22K-001", name: "22K Gold Necklace", category: "Necklace", purity: "22K", weight: 18.5, price: 108750, stock: 3 },
  { id: 2, sku: "DR-DIA-001", name: "Diamond Solitaire Ring", category: "Ring", purity: "18K+DIA", weight: 4.2, price: 85000, stock: 8 },
  { id: 3, sku: "GB-22K-001", name: "22K Gold Bangles Set", category: "Bangles", purity: "22K", weight: 42.0, price: 245000, stock: 2 },
  { id: 4, sku: "GE-22K-001", name: "22K Gold Earrings", category: "Earrings", purity: "22K", weight: 6.8, price: 39850, stock: 12 },
  { id: 5, sku: "PR-PLT-001", name: "Platinum Couple Ring", category: "Ring", purity: "Platinum", weight: 8.5, price: 42000, stock: 5 },
  { id: 6, sku: "SA-SIL-001", name: "Silver Anklet Pair", category: "Anklet", purity: "Silver", weight: 28.0, price: 2480, stock: 24 },
  { id: 7, sku: "GC-22K-001", name: "Gold Chain 20 inch", category: "Chain", purity: "22K", weight: 12.3, price: 72450, stock: 6 },
  { id: 8, sku: "DP-DIA-001", name: "Diamond Pendant Set", category: "Pendant", purity: "18K+DIA", weight: 3.1, price: 68000, stock: 4 },
  { id: 9, sku: "SB-SIL-002", name: "Silver Bangle Set", category: "Bangles", purity: "Silver", weight: 85.0, price: 7200, stock: 0 },
  { id: 10, sku: "GR-18K-001", name: "18K Gold Ring", category: "Ring", purity: "18K", weight: 3.8, price: 22400, stock: 18 },
  { id: 11, sku: "GM-22K-001", name: "Gold Mangalsutra", category: "Necklace", purity: "22K", weight: 8.2, price: 48100, stock: 7 },
  { id: 12, sku: "DE-DIA-001", name: "Diamond Earring Studs", category: "Earrings", purity: "18K+DIA", weight: 2.8, price: 45000, stock: 9 },
];

const customersData = [
  { id: 1, name: "Priya Sharma", phone: "98765 43210", city: "Mumbai", kyc: "Verified", total: 485000, visits: 12, points: 1850, wallet: 5000, outstanding: 0, joined: "Jan 2022" },
  { id: 2, name: "Rajesh Kumar", phone: "91234 56789", city: "Delhi", kyc: "Verified", total: 1250000, visits: 28, points: 4250, wallet: 12000, outstanding: 25000, joined: "Mar 2021" },
  { id: 3, name: "Meena Patel", phone: "70000 12345", city: "Ahmedabad", kyc: "Pending", total: 82000, visits: 5, points: 320, wallet: 0, outstanding: 38200, joined: "Oct 2023" },
  { id: 4, name: "Sunita Gupta", phone: "88888 77777", city: "Pune", kyc: "Verified", total: 215000, visits: 15, points: 780, wallet: 2500, outstanding: 0, joined: "Jun 2022" },
  { id: 5, name: "Vikram Singh", phone: "99911 22233", city: "Jaipur", kyc: "Verified", total: 892000, visits: 42, points: 3200, wallet: 8000, outstanding: 0, joined: "Dec 2020" },
  { id: 6, name: "Kavita Nair", phone: "77455 66699", city: "Kochi", kyc: "Verified", total: 145000, visits: 9, points: 520, wallet: 1000, outstanding: 12000, joined: "Aug 2023" },
];

const stockData = [
  { sku: "GN-22K-001", name: "22K Gold Necklace", category: "Necklace", purity: "22K", weight: "18.5g", qty: 3, location: "Main Store", status: "Available", barcode: "100001" },
  { sku: "DR-DIA-001", name: "Diamond Solitaire Ring", category: "Ring", purity: "18K+DIA", weight: "4.2g", qty: 8, location: "Showcase A", status: "Available", barcode: "100002" },
  { sku: "GB-22K-001", name: "22K Gold Bangle Set", category: "Bangles", purity: "22K", weight: "42.0g", qty: 2, location: "Main Store", status: "Low Stock", barcode: "100003" },
  { sku: "GE-22K-001", name: "22K Gold Earrings", category: "Earrings", purity: "22K", weight: "6.8g", qty: 12, location: "Showcase B", status: "Available", barcode: "100004" },
  { sku: "PR-PLT-001", name: "Platinum Couple Ring", category: "Ring", purity: "Platinum", weight: "8.5g", qty: 5, location: "VIP Counter", status: "Available", barcode: "100005" },
  { sku: "SA-SIL-001", name: "Silver Anklet Pair", category: "Anklet", purity: "Silver", weight: "28.0g", qty: 24, location: "Silver Section", status: "Available", barcode: "100006" },
  { sku: "GC-22K-001", name: "Gold Chain 20 inch", category: "Chain", purity: "22K", weight: "12.3g", qty: 6, location: "Main Store", status: "Available", barcode: "100007" },
  { sku: "DP-DIA-001", name: "Diamond Pendant Set", category: "Pendant", purity: "18K+DIA", weight: "3.1g", qty: 4, location: "Showcase A", status: "Available", barcode: "100008" },
  { sku: "SB-SIL-002", name: "Silver Bangle Set", category: "Bangles", purity: "Silver", weight: "85.0g", qty: 0, location: "—", status: "Out of Stock", barcode: "100009" },
  { sku: "GR-18K-001", name: "18K Gold Ring", category: "Ring", purity: "18K", weight: "3.8g", qty: 18, location: "Showcase B", status: "Available", barcode: "100010" },
];

const notifications = [
  { id: 1, type: "alert", message: "Silver Bangle Set is out of stock", time: "5 min ago" },
  { id: 2, type: "success", message: "Invoice INV-2024-0892 paid — ₹48,500", time: "18 min ago" },
  { id: 3, type: "info", message: "Gold rate updated: ₹5,842/gm (22K) +0.8%", time: "45 min ago" },
  { id: 4, type: "warning", message: "3 customer KYC verifications pending", time: "1 hr ago" },
  { id: 5, type: "info", message: "November monthly report is ready", time: "2 hrs ago" },
];

const karigarData = [
  { id: 1, name: "Raman Soni", specialty: "Gold Casting", active: 3, completed: 48, rating: 4.8, status: "Active" },
  { id: 2, name: "Prakash Mali", specialty: "Stone Setting", active: 2, completed: 31, rating: 4.6, status: "Active" },
  { id: 3, name: "Dilip Chauhan", specialty: "Filigree Work", active: 1, completed: 22, rating: 4.9, status: "On Leave" },
  { id: 4, name: "Suresh Jain", specialty: "Polishing", active: 5, completed: 67, rating: 4.7, status: "Active" },
];

const jobCards = [
  { id: "JW-001", item: "Custom Necklace 22K", karigar: "Raman Soni", weight: "24.5g", dueDate: "10 Dec 2024", status: "In Progress", progress: 65 },
  { id: "JW-002", item: "Bridal Set (Necklace + Earrings)", karigar: "Prakash Mali", weight: "52.0g", dueDate: "15 Dec 2024", status: "Stone Setting", progress: 40 },
  { id: "JW-003", item: "Diamond Solitaire Ring Repair", karigar: "Dilip Chauhan", weight: "4.8g", dueDate: "08 Dec 2024", status: "Polishing", progress: 85 },
  { id: "JW-004", item: "Silver Anklet × 4 pairs", karigar: "Suresh Jain", weight: "112g", dueDate: "12 Dec 2024", status: "Casting", progress: 25 },
];

const cashBookEntries = [
  { date: "28 Nov 2024", desc: "Sale — INV-2024-0892 — Priya Sharma", type: "Receipt", amount: 48500 },
  { date: "28 Nov 2024", desc: "Sale — INV-2024-0891 — Rajesh Kumar", type: "Receipt", amount: 125000 },
  { date: "28 Nov 2024", desc: "Purchase — Raw Gold 10gm", type: "Payment", amount: 59000 },
  { date: "28 Nov 2024", desc: "Shop Rent — November", type: "Payment", amount: 35000 },
  { date: "27 Nov 2024", desc: "Sale — INV-2024-0887 — Anita Rao", type: "Receipt", amount: 32000 },
  { date: "27 Nov 2024", desc: "Karigar Payment — Raman Soni", type: "Payment", amount: 18000 },
  { date: "27 Nov 2024", desc: "Electricity Bill", type: "Payment", amount: 4200 },
  { date: "26 Nov 2024", desc: "Sale — INV-2024-0885 — Sunita Gupta", type: "Receipt", amount: 12500 },
];

const schemeData = [
  { id: "GS-001", name: "Monthly Gold Chit", duration: "11 months", monthlyAmt: 5000, enrolled: 48, nextDue: "01 Dec 2024" },
  { id: "GS-002", name: "Diwali Gold Scheme 2025", duration: "12 months", monthlyAmt: 10000, enrolled: 124, nextDue: "01 Dec 2024" },
  { id: "GS-003", name: "Diamond Plan", duration: "24 months", monthlyAmt: 15000, enrolled: 22, nextDue: "05 Dec 2024" },
  { id: "GS-004", name: "Silver Savings", duration: "6 months", monthlyAmt: 2000, enrolled: 67, nextDue: "01 Dec 2024" },
];

// ─── SIDEBAR CONFIG ───────────────────────────────────────
const sidebarConfig = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, module: "dashboard" },
  {
    id: "masters", label: "Masters", icon: Database,
    children: [
      { id: "company", label: "Company Setup", module: "masters" },
      { id: "cust-master", label: "Customers", module: "masters" },
      { id: "suppliers", label: "Suppliers", module: "masters" },
      { id: "employees", label: "Employees", module: "masters" },
      { id: "categories", label: "Jewellery Categories", module: "masters" },
      { id: "purity", label: "Metal Purity", module: "masters" },
      { id: "stones", label: "Stone Master", module: "masters" },
      { id: "making", label: "Making Charges", module: "masters" },
      { id: "gst-m", label: "GST Master", module: "masters" },
      { id: "rate-m", label: "Rate Master", module: "masters" },
      { id: "branches", label: "Branches", module: "masters" },
      { id: "user-roles", label: "Users & Roles", module: "masters" },
    ],
  },
  {
    id: "inventory", label: "Inventory", icon: Package,
    children: [
      { id: "live-stock", label: "Live Stock", module: "inventory" },
      { id: "inward", label: "Stock Inward", module: "inventory" },
      { id: "outward", label: "Stock Outward", module: "inventory" },
      { id: "transfer", label: "Stock Transfer", module: "inventory" },
      { id: "adjust", label: "Stock Adjustment", module: "inventory" },
      { id: "barcode", label: "Barcode / QR / RFID", module: "inventory" },
      { id: "audit", label: "Stock Audit", module: "inventory" },
      { id: "dead", label: "Dead Stock", module: "inventory" },
      { id: "repair-stk", label: "Repair Stock", module: "inventory" },
      { id: "oldgold", label: "Old Gold Stock", module: "inventory" },
    ],
  },
  {
    id: "sales", label: "Sales", icon: ShoppingCart,
    children: [
      { id: "pos", label: "POS Billing", module: "pos" },
      { id: "quick-sale", label: "Quick Sale", module: "pos" },
      { id: "advance", label: "Advance Booking", module: "pos" },
      { id: "estimate", label: "Estimates", module: "pos" },
      { id: "inv-hist", label: "Invoice History", module: "pos" },
      { id: "return-exc", label: "Return / Exchange", module: "pos" },
      { id: "gift-v", label: "Gift Vouchers", module: "pos" },
    ],
  },
  {
    id: "purchase", label: "Purchase", icon: Truck,
    children: [
      { id: "pur-entry", label: "Purchase Entry", module: "purchase" },
      { id: "pur-orders", label: "Purchase Orders", module: "purchase" },
      { id: "pur-ret", label: "Purchase Returns", module: "purchase" },
      { id: "sup-pay", label: "Supplier Payments", module: "purchase" },
      { id: "grn", label: "GRN", module: "purchase" },
    ],
  },
  {
    id: "customers", label: "Customers", icon: Users,
    children: [
      { id: "all-cust", label: "All Customers", module: "customers" },
      { id: "kyc", label: "KYC Management", module: "customers" },
      { id: "loyalty", label: "Loyalty Points", module: "customers" },
      { id: "wallet", label: "Wallet / Advance", module: "customers" },
      { id: "cust-led", label: "Customer Ledger", module: "customers" },
      { id: "schemes-c", label: "Saving Schemes", module: "schemes" },
    ],
  },
  {
    id: "manufacturing", label: "Manufacturing", icon: Hammer,
    children: [
      { id: "karigar", label: "Karigar", module: "manufacturing" },
      { id: "jobwork", label: "Job Work", module: "manufacturing" },
      { id: "mfg-ord", label: "Mfg Orders", module: "manufacturing" },
      { id: "stone-set", label: "Stone Setting", module: "manufacturing" },
      { id: "polishing", label: "Polishing", module: "manufacturing" },
      { id: "repair-m", label: "Repair Orders", module: "manufacturing" },
    ],
  },
  {
    id: "accounts", label: "Accounts", icon: BookOpen,
    children: [
      { id: "cashbook", label: "Cash Book", module: "accounts" },
      { id: "bankbook", label: "Bank Book", module: "accounts" },
      { id: "journal", label: "Journal", module: "accounts" },
      { id: "receipts", label: "Receipts", module: "accounts" },
      { id: "payments-a", label: "Payments", module: "accounts" },
      { id: "expenses", label: "Expenses", module: "accounts" },
      { id: "trial", label: "Trial Balance", module: "accounts" },
      { id: "pl", label: "Profit & Loss", module: "accounts" },
      { id: "bs", label: "Balance Sheet", module: "accounts" },
    ],
  },
  {
    id: "reports", label: "Reports", icon: BarChart3,
    children: [
      { id: "sales-r", label: "Sales Reports", module: "reports" },
      { id: "stock-r", label: "Stock Reports", module: "reports" },
      { id: "cust-r", label: "Customer Reports", module: "reports" },
      { id: "gst-r", label: "GST Reports", module: "reports" },
      { id: "profit-r", label: "Profit Reports", module: "reports" },
      { id: "emp-r", label: "Employee Reports", module: "reports" },
    ],
  },
  {
    id: "ai", label: "AI Features", icon: Brain,
    children: [
      { id: "ai-chat", label: "AI Assistant", module: "ai" },
      { id: "ai-pred", label: "Sales Prediction", module: "ai" },
      { id: "ai-rate", label: "Rate Analysis", module: "ai" },
      { id: "ai-rec", label: "Recommendations", module: "ai" },
    ],
  },
  { id: "settings", label: "Settings", icon: Settings, module: "settings" },
];

// ─── UTILS ─────────────────────────────────────────────────
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── SIDEBAR ───────────────────────────────────────────────
function Sidebar({
  active, onSelect, collapsed, onToggle,
}: {
  active: string; onSelect: (m: string) => void; collapsed: boolean; onToggle: () => void;
}) {
  const [openGroups, setOpenGroups] = useState<string[]>(["sales", "inventory"]);

  const toggle = (id: string) =>
    setOpenGroups(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);

  return (
    <motion.div
      animate={{ width: collapsed ? 60 : 240 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
      className="flex-shrink-0 h-full flex flex-col overflow-hidden"
      style={{ background: "var(--sidebar)", borderRight: "1px solid var(--sidebar-border)" }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-3 py-4 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--sidebar-border)" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}
        >
          <Gem className="w-4 h-4 text-black" />
        </div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }} className="flex-1 min-w-0">
            <div className="text-white font-bold text-sm tracking-wide leading-none">JewelERP</div>
            <div className="text-xs mt-0.5" style={{ color: GOLD }}>Pro Edition</div>
          </motion.div>
        )}
        {!collapsed && (
          <button onClick={onToggle} className="p-1 text-gray-600 hover:text-gray-400 transition-colors flex-shrink-0">
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        {collapsed && (
          <button
            onClick={onToggle}
            className="absolute left-[52px] top-[18px] w-5 h-5 rounded-full flex items-center justify-center z-50"
            style={{ background: "#1E2235", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <ChevronRight className="w-3 h-3 text-gray-400" />
          </button>
        )}
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-2" style={{ scrollbarWidth: "none" }}>
        {sidebarConfig.map((item) => {
          const Icon = item.icon;
          const hasChildren = !!item.children;
          const isOpen = openGroups.includes(item.id);
          const isActive = item.module === active || item.children?.some(c => c.module === active);

          return (
            <div key={item.id}>
              <button
                onClick={() => hasChildren ? toggle(item.id) : onSelect(item.module!)}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "w-full flex items-center gap-3 text-left transition-all duration-150",
                  collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5",
                  isActive && !hasChildren
                    ? "text-yellow-400"
                    : "text-gray-400 hover:text-gray-200"
                )}
                style={isActive && !hasChildren ? { background: "rgba(212,175,55,0.08)" } : {}}
              >
                <Icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-yellow-400" : "")} />
                {!collapsed && (
                  <>
                    <span className="text-xs font-medium flex-1 truncate">{item.label}</span>
                    {hasChildren && (
                      <ChevronDown
                        className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200"
                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
                      />
                    )}
                  </>
                )}
              </button>

              {!collapsed && hasChildren && (
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      {item.children!.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => onSelect(child.module)}
                          className={cn(
                            "w-full flex items-center gap-2 pl-10 pr-3 py-1.5 text-left text-xs transition-colors",
                            active === child.module ? "text-yellow-400" : "text-gray-500 hover:text-gray-300"
                          )}
                        >
                          <span className="w-1 h-1 rounded-full bg-current opacity-60" />
                          {child.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="px-3 py-3 flex-shrink-0" style={{ borderTop: "1px solid var(--sidebar-border)" }}>
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-black text-xs font-bold flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}
            >
              AD
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-medium truncate">Admin User</div>
              <div className="text-xs text-gray-500">Owner</div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── GOLD TICKER ────────────────────────────────────────────
function GoldTicker() {
  const rates = [
    { label: "Gold 24K", value: "₹6,320/gm", change: "+0.8%", up: true },
    { label: "Gold 22K", value: "₹5,842/gm", change: "+0.8%", up: true },
    { label: "Gold 18K", value: "₹4,740/gm", change: "+0.8%", up: true },
    { label: "Silver", value: "₹74.2/gm", change: "−0.3%", up: false },
    { label: "Platinum", value: "₹2,840/gm", change: "+0.2%", up: true },
    { label: "Diamond (0.5ct)", value: "₹28,500", change: "0.0%", up: true },
  ];
  return (
    <div className="flex items-center gap-1 overflow-hidden flex-1">
      <div className="flex-shrink-0 flex items-center gap-1.5 mr-3">
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: GREEN }} />
        <span className="text-xs font-semibold text-muted-foreground tracking-wider">LIVE</span>
      </div>
      <div className="flex items-center gap-6 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {rates.map((r) => (
          <div key={r.label} className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-xs text-muted-foreground">{r.label}:</span>
            <span className="text-xs font-bold text-foreground">{r.value}</span>
            <span className={cn("text-xs font-medium", r.up ? "text-green-500" : "text-red-500")}>
              {r.up ? "▲" : "▼"} {r.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── HEADER ────────────────────────────────────────────────
function Header({
  dark, onToggleDark, onLogout, activeModule, notifCount, onNotif, sidebarCollapsed, onToggleSidebar,
}: {
  dark: boolean; onToggleDark: () => void; onLogout: () => void;
  activeModule: string; notifCount: number; onNotif: () => void;
  sidebarCollapsed: boolean; onToggleSidebar: () => void;
}) {
  const [showSearch, setShowSearch] = useState(false);
  const [q, setQ] = useState("");
  const moduleLabels: Record<string, string> = {
    dashboard: "Dashboard", pos: "POS Billing", inventory: "Inventory Management",
    customers: "Customer Management", masters: "Masters", purchase: "Purchase",
    manufacturing: "Manufacturing", schemes: "Gold Saving Schemes",
    accounts: "Accounts", reports: "Reports", settings: "Settings", ai: "AI Features",
  };
  return (
    <div className="flex-shrink-0">
      {/* Ticker bar */}
      <div
        className="flex items-center px-4 py-1.5"
        style={{
          background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <GoldTicker />
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-shrink-0 ml-4">
          <Clock className="w-3 h-3" />
          <span>Updated {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
      </div>
      {/* Main header */}
      <div
        className="flex items-center gap-4 px-6 py-3"
        style={{
          background: "var(--card)",
          borderBottom: "1px solid var(--border)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        {sidebarCollapsed && (
          <button onClick={onToggleSidebar} className="text-muted-foreground hover:text-foreground lg:hidden">
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="font-semibold text-foreground text-lg leading-tight">
            {moduleLabels[activeModule] || activeModule}
          </h1>
          <p className="text-xs text-muted-foreground">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="flex-1" />

        {/* Search */}
        <div className="relative">
          {showSearch ? (
            <motion.input
              autoFocus
              initial={{ width: 0 }} animate={{ width: 260 }}
              value={q} onChange={e => setQ(e.target.value)}
              onBlur={() => { if (!q) setShowSearch(false); }}
              placeholder="Search products, customers, invoices..."
              className="px-4 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none"
            />
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={onNotif}
          className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
        >
          <Bell className="w-4 h-4" />
          {notifCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-black text-xs font-bold"
              style={{ background: GOLD }}
            >
              {notifCount}
            </span>
          )}
        </button>

        <button
          onClick={onToggleDark}
          className="p-2 rounded-xl transition-colors hover:bg-muted/40"
          style={{ color: dark ? GOLD : undefined }}
        >
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
        </button>

        <div className="flex items-center gap-2.5 pl-3 border-l border-border">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-black text-xs font-bold"
            style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}
          >
            AD
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-foreground leading-none">Admin User</div>
            <div className="text-xs text-muted-foreground mt-0.5">Owner • Main Branch</div>
          </div>
          <button onClick={onLogout} className="ml-1 p-1 text-muted-foreground hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── LOGIN ─────────────────────────────────────────────────
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("admin@jewelerpro.com");
  const [password, setPassword] = useState("Admin@1234");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [role, setRole] = useState("Owner");
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1600);
  };

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: "#0B0D12" }}>
      {/* Brand panel */}
      <div
        className="hidden lg:flex lg:w-[55%] relative overflow-hidden flex-col justify-between p-14"
        style={{ background: "linear-gradient(145deg, #0B0D12 0%, #141826 45%, #111928 100%)" }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(212,175,55,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.8) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow circles */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.06]" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)` }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.05]" style={{ background: `radial-gradient(circle, ${BLUE}, transparent 70%)` }} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}>
            <Gem className="w-5 h-5 text-black" />
          </div>
          <div>
            <div className="text-white font-bold text-lg tracking-wide">JewelERP</div>
            <div className="text-xs" style={{ color: GOLD }}>Pro Edition v3.5</div>
          </div>
        </div>

        {/* Center content */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <h1
            className="text-5xl font-light text-white leading-[1.15] mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Complete Jewellery<br />
            <span style={{ color: GOLD }}>Business Management</span><br />
            in One Platform
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md">
            Trusted by 2,800+ jewellery stores across India for inventory, billing, accounts, and AI-powered insights.
          </p>
          <div className="flex flex-col gap-4 max-w-sm">
            {[
              { icon: Shield, text: "JWT-secured with role-based access for 9 user types" },
              { icon: Zap, text: "Real-time MCX gold & silver rate integration" },
              { icon: Brain, text: "AI sales predictions, inventory suggestions & insights" },
              { icon: Sparkles, text: "GST-compliant billing with WhatsApp invoice sharing" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,175,55,0.12)" }}>
                  <Icon className="w-4 h-4" style={{ color: GOLD }} />
                </div>
                <span className="text-gray-400 text-sm leading-snug">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative z-10 text-gray-600 text-xs">
          © 2024 JewelERP Pro • ISO 27001 Certified • GDPR & IT Act Compliant
        </div>
      </div>

      {/* Login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <motion.div
          className="w-full max-w-[400px]"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}>
              <Gem className="w-4 h-4 text-black" />
            </div>
            <span className="font-bold text-xl text-gray-900">JewelERP Pro</span>
          </div>

          <h2 className="text-3xl font-semibold text-gray-900 mb-1.5" style={{ fontFamily: "'Playfair Display', serif" }}>
            Welcome back
          </h2>
          <p className="text-gray-500 text-sm mb-7">Sign in to your JewelERP Pro dashboard</p>

          {/* Role picker */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sign in as</label>
            <div className="flex flex-wrap gap-1.5">
              {["Owner", "Admin", "Manager", "Cashier", "Sales Executive", "Accountant"].map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
                  style={role === r
                    ? { background: GOLD, borderColor: GOLD, color: "#1A1A1A" }
                    : { background: "#F8F7F4", borderColor: "#E5E5E5", color: "#555" }
                  }
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:bg-white transition-all"
                placeholder="admin@jewelerpro.com"
                style={{ "--tw-ring-color": GOLD } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPwd ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-11 py-2.5 border border-gray-200 rounded-xl text-gray-900 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:bg-white transition-all"
                placeholder="••••••••"
              />
              <button onClick={() => setShowPwd(!showPwd)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="w-4 h-4 rounded" style={{ accentColor: GOLD }} />
              <span className="text-sm text-gray-600">Remember me for 30 days</span>
            </label>
            <button onClick={() => setForgot(true)} className="text-sm font-medium hover:underline" style={{ color: GOLD }}>
              Forgot password?
            </button>
          </div>

          <button
            onClick={handleLogin} disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-black transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
            style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}
          >
            {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Authenticating…</> : <>Sign In to JewelERP Pro <ArrowRight className="w-4 h-4" /></>}
          </button>

          <p className="text-center text-xs text-gray-400 mt-7">
            🔒 Protected by JWT Authentication • 256-bit SSL Encryption
          </p>
        </motion.div>
      </div>

      {/* Forgot modal */}
      <AnimatePresence>
        {forgot && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Reset Password</h3>
              {!forgotSent ? (
                <>
                  <p className="text-gray-500 text-sm mb-5">Enter your registered email and we will send an OTP.</p>
                  <input type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm mb-4 focus:outline-none"
                  />
                  <button onClick={() => setForgotSent(true)} className="w-full py-2.5 rounded-xl font-bold text-black mb-3 text-sm" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}>
                    Send Reset OTP
                  </button>
                </>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-500" />
                  <p className="font-semibold text-gray-800 mb-1">OTP sent!</p>
                  <p className="text-gray-500 text-sm">Check your inbox for the 6-digit code.</p>
                </div>
              )}
              <button onClick={() => { setForgot(false); setForgotSent(false); }} className="w-full text-center text-sm text-gray-400 hover:text-gray-600 mt-1">Cancel</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── KPI CARD ──────────────────────────────────────────────
function KPICard({ label, value, change, up, icon: Icon, gradient, sub }: {
  label: string; value: string; change?: string; up?: boolean;
  icon: React.ElementType; gradient: string; sub?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 8px 28px rgba(212,175,55,0.1)" }}
      className="bg-card rounded-xl p-4 border border-border relative overflow-hidden cursor-default"
      style={{ transition: "box-shadow 0.2s" }}
    >
      <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-[0.06]" style={{ background: GOLD }} />
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: gradient }}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        {change && (
          <span className={cn("flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full", up ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700")}>
            {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{change}
          </span>
        )}
      </div>
      <div className="text-[22px] font-bold text-card-foreground leading-none tracking-tight mb-1">{value}</div>
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      {sub && <div className="text-xs text-muted-foreground mt-1 opacity-60">{sub}</div>}
    </motion.div>
  );
}

// ─── DASHBOARD ─────────────────────────────────────────────
function Dashboard({ dark }: { dark: boolean }) {
  const kpis = [
    { label: "Today's Sales", value: "₹4,82,500", change: "12.5%", up: true, icon: TrendingUp, gradient: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, sub: "vs ₹4,28,900 yesterday" },
    { label: "Today's Purchase", value: "₹2,15,000", change: "8.2%", up: true, icon: ShoppingBag, gradient: `linear-gradient(135deg, #3B82F6, #60A5FA)`, sub: "vs ₹1,98,500 yesterday" },
    { label: "Today's Profit", value: "₹1,18,450", change: "15.3%", up: true, icon: IndianRupee, gradient: `linear-gradient(135deg, ${GREEN}, #34D399)`, sub: "Margin: 24.6%" },
    { label: "Pending Orders", value: "23", change: "2", up: false, icon: Clock, gradient: `linear-gradient(135deg, ${ORANGE}, #FBBF24)`, sub: "₹8,45,000 value" },
    { label: "Gold Stock", value: "2,418g", change: "45g", up: false, icon: Coins, gradient: `linear-gradient(135deg, #B8860B, ${GOLD})`, sub: "22K: 1,850g | 18K: 568g" },
    { label: "Silver Stock", value: "18.5kg", change: "1.2kg", up: true, icon: Scale, gradient: `linear-gradient(135deg, #6B7280, #9CA3AF)`, sub: "Pure: 12kg | 925: 6.5kg" },
    { label: "Diamond Stock", value: "145 pcs", change: "8 pcs", up: false, icon: Gem, gradient: `linear-gradient(135deg, ${PURPLE}, #A78BFA)`, sub: "0.5ct avg | ₹42L value" },
    { label: "Cash Balance", value: "₹8,45,200", icon: Wallet, gradient: `linear-gradient(135deg, ${GREEN}, #059669)`, sub: "Counter + safe" },
    { label: "Bank Balance", value: "₹24,12,500", icon: Building2, gradient: `linear-gradient(135deg, #1E3A8A, ${BLUE})`, sub: "HDFC + SBI" },
    { label: "Gold Rate (22K)", value: "₹5,842/g", change: "0.8%", up: true, icon: TrendingUp, gradient: `linear-gradient(135deg, ${GOLD}, #B8860B)`, sub: "MCX + 3% local" },
    { label: "Customers Today", value: "18", change: "3", up: true, icon: Users, gradient: `linear-gradient(135deg, #EC4899, #F472B6)`, sub: "12 new, 6 returning" },
    { label: "Pending Payments", value: "₹3,28,000", change: "8.5%", up: false, icon: AlertCircle, gradient: `linear-gradient(135deg, ${RED}, #F87171)`, sub: "From 14 customers" },
  ];

  const tt = {
    contentStyle: { background: dark ? "#141821" : "#fff", border: "1px solid rgba(212,175,55,0.25)", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", fontSize: "12px" },
    labelStyle: { color: dark ? "#E4E4EC" : "#1A1A1A", fontWeight: 600 },
    cursor: { stroke: "rgba(212,175,55,0.3)" },
  };

  return (
    <div className="p-5 space-y-5 overflow-auto h-full">
      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {kpis.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.035 }}>
            <KPICard {...k} />
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Sales vs Purchases Area Chart */}
        <div className="xl:col-span-2 bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-card-foreground">Sales vs Purchases vs Profit</h3>
              <p className="text-xs text-muted-foreground mt-0.5">FY 2024-25 • Monthly (₹ Lakhs)</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {[{ c: GOLD, l: "Sales" }, { c: BLUE, l: "Purchase" }, { c: GREEN, l: "Profit" }].map(({ c, l }) => (
                <span key={l} className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 rounded inline-block" style={{ background: c }} /> {l}
                </span>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlySalesData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <defs>
                {[{ id: "gs", c: GOLD }, { id: "gp", c: BLUE }, { id: "gpr", c: GREEN }].map(({ id, c }) => (
                  <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={c} stopOpacity={0.28} />
                    <stop offset="95%" stopColor={c} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"} />
              <XAxis dataKey="month" tick={{ fill: dark ? "#666" : "#999", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: dark ? "#666" : "#999", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...tt} formatter={(v: number) => [`₹${v}L`, ""]} />
              <Area type="monotone" dataKey="sales" stroke={GOLD} strokeWidth={2} fill="url(#gs)" />
              <Area type="monotone" dataKey="purchases" stroke={BLUE} strokeWidth={2} fill="url(#gp)" />
              <Area type="monotone" dataKey="profit" stroke={GREEN} strokeWidth={2} fill="url(#gpr)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Metal Pie */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="mb-3">
            <h3 className="font-semibold text-card-foreground">Metal-wise Sales</h3>
            <p className="text-xs text-muted-foreground mt-0.5">This month by revenue %</p>
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={metalSalesData} cx="50%" cy="50%" innerRadius={52} outerRadius={78} paddingAngle={3} dataKey="value">
                {metalSalesData.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
              </Pie>
              <Tooltip contentStyle={{ ...tt.contentStyle }} formatter={(v: number) => [`${v}%`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-1">
            {metalSalesData.map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-muted-foreground">{d.name}</span>
                </div>
                <span className="font-semibold text-card-foreground">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Recent Transactions */}
        <div className="xl:col-span-2 bg-card rounded-xl border border-border">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <h3 className="font-semibold text-card-foreground">Recent Transactions</h3>
              <p className="text-xs text-muted-foreground">Today's activity</p>
            </div>
            <button className="text-xs font-semibold hover:underline" style={{ color: GOLD }}>View All →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Invoice", "Customer", "Type", "Amount", "Status"].map(h => (
                    <th key={h} className={cn("px-5 py-3 text-left text-xs font-semibold text-muted-foreground", h === "Amount" && "text-right", h === "Status" && "text-center", (h === "Type") && "hidden md:table-cell")}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map(tx => (
                  <tr key={tx.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3">
                      <div className="font-medium text-card-foreground text-xs">{tx.id}</div>
                      <div className="text-muted-foreground text-xs">{tx.time}</div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="text-card-foreground text-xs font-medium">{tx.customer}</div>
                      <div className="text-muted-foreground text-xs truncate max-w-[140px]">{tx.items}</div>
                    </td>
                    <td className="px-3 py-3 hidden md:table-cell">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium",
                        tx.type === "Sale" ? "bg-green-50 text-green-700" :
                        tx.type === "Purchase" ? "bg-blue-50 text-blue-700" :
                        tx.type === "Return" ? "bg-red-50 text-red-700" : "bg-yellow-50 text-yellow-700"
                      )}>{tx.type}</span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span className={cn("font-bold text-sm", tx.amount < 0 ? "text-red-500" : "text-card-foreground")}>
                        {tx.amount < 0 ? "−" : ""}₹{Math.abs(tx.amount).toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium",
                        tx.status === "Paid" ? "bg-green-50 text-green-700" :
                        tx.status === "Pending" ? "bg-yellow-50 text-yellow-700" :
                        tx.status === "Refunded" ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"
                      )}>{tx.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions + Alerts */}
        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-card-foreground mb-3">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { l: "New Sale", i: ShoppingCart, c: GOLD },
                { l: "Add Stock", i: Plus, c: BLUE },
                { l: "Customer", i: User, c: GREEN },
                { l: "Purchase", i: Truck, c: ORANGE },
                { l: "Receipt", i: Receipt, c: PURPLE },
                { l: "Report", i: BarChart3, c: "#EC4899" },
              ].map(({ l, i: Icon, c }) => (
                <button key={l} className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-border hover:border-yellow-400/40 transition-all hover:-translate-y-0.5 text-card-foreground">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${c}20` }}>
                    <Icon className="w-4 h-4" style={{ color: c }} />
                  </div>
                  <span className="text-xs font-medium leading-tight text-center">{l}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-card-foreground mb-3">Live Alerts</h3>
            <div className="space-y-3">
              {notifications.slice(0, 4).map(n => (
                <div key={n.id} className="flex items-start gap-2.5">
                  <div className={cn("w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                    n.type === "alert" ? "bg-red-50" : n.type === "success" ? "bg-green-50" : n.type === "warning" ? "bg-yellow-50" : "bg-blue-50"
                  )}>
                    {n.type === "alert" && <AlertCircle className="w-3 h-3 text-red-500" />}
                    {n.type === "success" && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                    {n.type === "warning" && <AlertCircle className="w-3 h-3 text-yellow-500" />}
                    {n.type === "info" && <Activity className="w-3 h-3 text-blue-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-card-foreground leading-snug">{n.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Growth Chart */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-card-foreground">Customer Growth</h3>
            <p className="text-xs text-muted-foreground">Total registered customers FY 2024-25</p>
          </div>
          <span className="text-sm font-bold" style={{ color: GOLD }}>3,450 total</span>
        </div>
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={customerGrowthData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"} />
            <XAxis dataKey="month" tick={{ fill: dark ? "#666" : "#999", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: dark ? "#666" : "#999", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip {...tt} formatter={(v: number) => [v.toLocaleString("en-IN"), "Customers"]} />
            <Line type="monotone" dataKey="customers" stroke={GOLD} strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── POS BILLING ───────────────────────────────────────────
function POSBilling() {
  const [cart, setCart] = useState<Array<{ p: typeof products[0]; qty: number }>>([]);
  const [custId, setCustId] = useState("");
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [payMethod, setPayMethod] = useState("Cash");
  const [discount, setDiscount] = useState(0);
  const [amtPaid, setAmtPaid] = useState("");
  const [done, setDone] = useState(false);

  const cats = ["All", "Necklace", "Ring", "Bangles", "Earrings", "Chain", "Pendant", "Anklet"];
  const filtered = products.filter(p =>
    (cat === "All" || p.category === cat) &&
    (!search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()))
  );
  const addToCart = (p: typeof products[0]) =>
    setCart(prev => {
      const ex = prev.find(c => c.p.id === p.id);
      return ex ? prev.map(c => c.p.id === p.id ? { ...c, qty: c.qty + 1 } : c) : [...prev, { p, qty: 1 }];
    });
  const removeFromCart = (id: number) => setCart(prev => prev.filter(c => c.p.id !== id));
  const changeQty = (id: number, delta: number) =>
    setCart(prev => prev.map(c => c.p.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c));

  const subtotal = cart.reduce((s, c) => s + c.p.price * c.qty, 0);
  const discAmt = (subtotal * discount) / 100;
  const taxable = subtotal - discAmt;
  const gst = taxable * 0.03;
  const total = taxable + gst;
  const change = parseFloat(amtPaid || "0") - total;
  const cust = customersData.find(c => String(c.id) === custId);

  if (done) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-card rounded-2xl border border-border p-10 max-w-md w-full text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-card-foreground mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Invoice Generated!</h2>
          <p className="text-muted-foreground text-sm mb-2">Invoice #INV-2024-0893</p>
          <p className="text-3xl font-bold mb-1" style={{ color: GOLD }}>₹{total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
          {cust && <p className="text-sm text-muted-foreground mb-6">Customer: {cust.name}</p>}
          <div className="flex gap-3">
            {[{ l: "Print", i: Printer }, { l: "PDF", i: Download }, { l: "WhatsApp", i: Send }].map(({ l, i: Icon }) => (
              <button key={l} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-xs text-card-foreground hover:bg-muted/40 transition-colors">
                <Icon className="w-4 h-4" /> {l}
              </button>
            ))}
            <button
              onClick={() => { setCart([]); setCustId(""); setDone(false); setDiscount(0); setAmtPaid(""); }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-black text-xs font-bold"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}
            >
              <Plus className="w-3 h-3" /> New Bill
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* Product catalog */}
      <div className="flex-1 flex flex-col overflow-hidden border-r border-border">
        {/* Customer + Search */}
        <div className="px-4 py-3 border-b border-border flex-shrink-0 space-y-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select value={custId} onChange={e => setCustId(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-background text-card-foreground text-sm focus:outline-none appearance-none"
              >
                <option value="">Walk-in Customer</option>
                {customersData.map(c => <option key={c.id} value={c.id}>{c.name} — {c.phone}</option>)}
              </select>
            </div>
            {cust && (
              <div className="text-xs bg-yellow-50 text-yellow-800 px-2 py-1.5 rounded-lg flex-shrink-0">
                <span className="font-semibold">{cust.points} pts</span>
                {cust.wallet > 0 && <span className="ml-2 text-green-700">₹{cust.wallet.toLocaleString("en-IN")} wallet</span>}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, SKU or scan barcode…"
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-background text-card-foreground text-sm focus:outline-none"
              />
            </div>
            <QrCode className="w-8 h-8 text-muted-foreground p-1.5 border border-border rounded-xl cursor-pointer hover:text-yellow-500 hover:border-yellow-400 transition-colors" />
          </div>
          <div className="flex gap-1.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className="px-3 py-1 rounded-lg text-xs font-medium flex-shrink-0 border transition-all"
                style={cat === c ? { background: GOLD, borderColor: GOLD, color: "#1A1A1A" } : { borderColor: "var(--border)", color: "var(--muted-foreground)" }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 content-start">
          {filtered.map(p => {
            const inCart = cart.find(c => c.p.id === p.id);
            return (
              <motion.button key={p.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => addToCart(p)}
                className={cn("relative rounded-xl border p-3 text-left transition-all duration-150 overflow-hidden",
                  inCart ? "border-yellow-400/60" : "border-border bg-card hover:border-yellow-400/30"
                )}
                style={inCart ? { background: "rgba(212,175,55,0.05)" } : {}}
              >
                {inCart && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-black text-xs font-bold" style={{ background: GOLD }}>
                    {inCart.qty}
                  </div>
                )}
                {p.stock <= 2 && p.stock > 0 && (
                  <span className="absolute top-2 left-2 bg-orange-100 text-orange-700 text-xs px-1.5 py-0.5 rounded font-medium">Low</span>
                )}
                {p.stock === 0 && (
                  <span className="absolute top-2 left-2 bg-red-100 text-red-700 text-xs px-1.5 py-0.5 rounded font-medium">Out</span>
                )}
                <div className="w-full aspect-square rounded-lg mb-2 flex items-center justify-center" style={{ background: "rgba(212,175,55,0.07)" }}>
                  <Gem className="w-7 h-7" style={{ color: GOLD, opacity: 0.55 }} />
                </div>
                <div className="text-xs font-semibold text-card-foreground truncate">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.purity} • {p.weight}g</div>
                <div className="text-sm font-bold mt-1" style={{ color: GOLD }}>₹{p.price.toLocaleString("en-IN")}</div>
                <div className="text-xs text-muted-foreground">Stock: {p.stock}</div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Cart */}
      <div className="w-80 xl:w-[340px] flex flex-col bg-card flex-shrink-0 overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between flex-shrink-0">
          <h3 className="font-semibold text-card-foreground">Cart ({cart.length})</h3>
          {cart.length > 0 && <button onClick={() => setCart([])} className="text-xs text-red-500 hover:underline">Clear</button>}
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {cart.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-sm py-12">
              <ShoppingCart className="w-10 h-10 mb-3 opacity-25" />
              <p>Cart is empty</p>
              <p className="text-xs mt-1 opacity-60">Click products to add</p>
            </div>
          )}
          {cart.map(({ p, qty }) => (
            <div key={p.id} className="flex gap-2 p-2.5 rounded-xl border border-border bg-background">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,175,55,0.08)" }}>
                <Gem className="w-4 h-4" style={{ color: GOLD }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-card-foreground truncate">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.sku} • {p.weight}g</div>
                <div className="text-xs font-bold" style={{ color: GOLD }}>₹{(p.price * qty).toLocaleString("en-IN")}</div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <button onClick={() => removeFromCart(p.id)} className="text-red-400 hover:text-red-600">
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center gap-1">
                  <button onClick={() => changeQty(p.id, -1)} className="w-5 h-5 rounded bg-muted text-card-foreground text-xs flex items-center justify-center">−</button>
                  <span className="text-xs w-4 text-center text-card-foreground">{qty}</span>
                  <button onClick={() => changeQty(p.id, 1)} className="w-5 h-5 rounded bg-muted text-card-foreground text-xs flex items-center justify-center">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-border p-4 space-y-3 flex-shrink-0">
            <div className="space-y-1.5 text-sm">
              {[
                { l: "Subtotal", v: `₹${subtotal.toLocaleString("en-IN")}` },
                { l: "GST (3%)", v: `₹${gst.toLocaleString("en-IN", { maximumFractionDigits: 0 })}` },
              ].map(r => (
                <div key={r.l} className="flex justify-between text-muted-foreground text-xs"><span>{r.l}</span><span>{r.v}</span></div>
              ))}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Discount</span>
                <div className="flex items-center gap-1">
                  <input type="number" value={discount} min={0} max={100} onChange={e => setDiscount(parseFloat(e.target.value) || 0)}
                    className="w-12 text-right border border-border rounded px-1 py-0.5 text-xs bg-background text-card-foreground"
                  />
                  <span className="text-xs">% = </span>
                  <span className="text-red-500 text-xs">−₹{discAmt.toFixed(0)}</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-card-foreground text-base border-t border-border pt-2">
                <span>Total</span>
                <span style={{ color: GOLD }}>₹{total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">Payment Method</p>
              <div className="flex gap-1.5">
                {["Cash", "Card", "UPI", "Split"].map(m => (
                  <button key={m} onClick={() => setPayMethod(m)}
                    className="flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all"
                    style={payMethod === m ? { background: GOLD, borderColor: GOLD, color: "#1A1A1A" } : { borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">Amount Received</p>
              <input type="number" value={amtPaid} onChange={e => setAmtPaid(e.target.value)}
                placeholder={`₹${total.toFixed(0)}`}
                className="w-full px-3 py-2 border border-border rounded-xl text-sm bg-background text-card-foreground focus:outline-none"
              />
              {parseFloat(amtPaid) > total && (
                <p className="text-xs text-green-500 mt-1">Change: ₹{change.toFixed(0)}</p>
              )}
            </div>

            <button
              onClick={() => setDone(true)}
              className="w-full py-3 rounded-xl font-bold text-black text-sm transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}
            >
              <Receipt className="w-4 h-4" /> Generate Invoice
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── INVENTORY ─────────────────────────────────────────────
function InventoryPage() {
  const [search, setSearch] = useState("");
  const [statusF, setStatusF] = useState("All");
  const [catF, setCatF] = useState("All");

  const filtered = stockData.filter(s =>
    (statusF === "All" || s.status === statusF) &&
    (catF === "All" || s.category === catF) &&
    (!search || s.name.toLowerCase().includes(search.toLowerCase()) || s.sku.toLowerCase().includes(search.toLowerCase()))
  );

  const stats = [
    { l: "Total SKUs", v: stockData.length, icon: Package2, c: BLUE },
    { l: "In Stock", v: stockData.filter(s => s.status === "Available").length, icon: CheckCircle2, c: GREEN },
    { l: "Low Stock", v: stockData.filter(s => s.status === "Low Stock").length, icon: AlertCircle, c: ORANGE },
    { l: "Out of Stock", v: stockData.filter(s => s.status === "Out of Stock").length, icon: X, c: RED },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-5 pt-5 space-y-4 flex-shrink-0">
        <div className="grid grid-cols-4 gap-3">
          {stats.map(s => (
            <div key={s.l} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${s.c}20` }}>
                <s.icon className="w-4 h-4" style={{ color: s.c }} />
              </div>
              <div>
                <div className="text-xl font-bold text-card-foreground">{s.v}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 flex-wrap pb-1">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, SKU, barcode…"
              className="w-full pl-9 pr-4 py-2 border border-border rounded-xl bg-card text-card-foreground text-sm focus:outline-none"
            />
          </div>
          {[
            { v: statusF, onChange: setStatusF, opts: ["All", "Available", "Low Stock", "Out of Stock"] },
            { v: catF, onChange: setCatF, opts: ["All", "Necklace", "Ring", "Bangles", "Earrings", "Chain", "Pendant", "Anklet"] },
          ].map((sel, i) => (
            <select key={i} value={sel.v} onChange={e => sel.onChange(e.target.value)}
              className="px-3 py-2 border border-border rounded-xl bg-card text-card-foreground text-sm focus:outline-none"
            >
              {sel.opts.map(o => <option key={o}>{o}</option>)}
            </select>
          ))}
          <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-xl text-sm text-muted-foreground hover:border-yellow-400/50 transition-all">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-black text-sm font-bold hover:opacity-90 transition-all" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}>
            <Plus className="w-4 h-4" /> Add Stock
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-5 pb-5 pt-2">
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                {["", "SKU", "Product Name", "Category", "Purity", "Weight", "Qty", "Location", "Status", "Actions"].map((h, i) => (
                  <th key={h+i} className={cn("px-4 py-3 text-left text-xs font-semibold text-muted-foreground",
                    i === 0 && "w-8", i >= 9 && "text-center",
                    [3,4,5,7].includes(i) && "hidden lg:table-cell"
                  )}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <motion.tr key={item.sku} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3"><input type="checkbox" className="w-4 h-4" style={{ accentColor: GOLD }} /></td>
                  <td className="px-3 py-3">
                    <div className="font-mono text-xs text-muted-foreground">{item.sku}</div>
                    <div className="text-xs text-muted-foreground opacity-60">{item.barcode}</div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(212,175,55,0.08)" }}>
                        <Gem className="w-3.5 h-3.5" style={{ color: GOLD }} />
                      </div>
                      <span className="text-xs font-semibold text-card-foreground">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 hidden lg:table-cell text-xs text-muted-foreground">{item.category}</td>
                  <td className="px-3 py-3 hidden lg:table-cell">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(212,175,55,0.1)", color: GOLD }}>{item.purity}</span>
                  </td>
                  <td className="px-3 py-3 hidden lg:table-cell text-right font-mono text-xs text-card-foreground">{item.weight}</td>
                  <td className="px-3 py-3 text-center">
                    <span className={cn("font-bold text-base", item.qty === 0 ? "text-red-500" : item.qty <= 3 ? "text-orange-500" : "text-card-foreground")}>{item.qty}</span>
                  </td>
                  <td className="px-3 py-3 hidden lg:table-cell text-xs text-muted-foreground">{item.location}</td>
                  <td className="px-3 py-3">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium",
                      item.status === "Available" ? "bg-green-50 text-green-700" :
                      item.status === "Low Stock" ? "bg-orange-50 text-orange-700" : "bg-red-50 text-red-700"
                    )}>{item.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 text-muted-foreground hover:text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-muted-foreground hover:text-yellow-500 rounded-lg hover:bg-yellow-50 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-muted-foreground hover:text-purple-500 rounded-lg hover:bg-purple-50 transition-colors"><QrCode className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── CUSTOMERS ─────────────────────────────────────────────
function CustomersPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof customersData[0] | null>(null);
  const filtered = customersData.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );
  const purchaseHistory = [
    { date: "28 Nov 2024", inv: "INV-2024-0892", item: "22K Gold Necklace", amount: 48500, status: "Paid" },
    { date: "15 Oct 2024", inv: "INV-2024-0754", item: "Gold Earrings × 2", amount: 39850, status: "Paid" },
    { date: "02 Sep 2024", inv: "INV-2024-0612", item: "Silver Anklets", amount: 4200, status: "Paid" },
    { date: "18 Jul 2024", inv: "INV-2024-0445", item: "Diamond Pendant", amount: 68000, status: "Paid" },
  ];

  return (
    <div className="flex h-full overflow-hidden">
      {/* List panel */}
      <div className={cn("flex flex-col overflow-hidden transition-all duration-300", selected ? "w-[380px]" : "flex-1")}>
        <div className="px-5 py-4 border-b border-border flex-shrink-0 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers…"
              className="w-full pl-9 pr-4 py-2 border border-border rounded-xl bg-card text-card-foreground text-sm focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-xl text-sm text-muted-foreground hover:border-yellow-400/50">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-black text-sm font-bold" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}>
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        <div className="px-5 py-2 border-b border-border flex-shrink-0 grid grid-cols-3 gap-3 text-center">
          {[
            { l: "Total", v: customersData.length, c: GOLD },
            { l: "KYC Verified", v: customersData.filter(c => c.kyc === "Verified").length, c: GREEN },
            { l: "Outstanding", v: `₹${customersData.reduce((s, c) => s + c.outstanding, 0).toLocaleString("en-IN")}`, c: RED },
          ].map(s => (
            <div key={s.l}>
              <div className="text-lg font-bold" style={{ color: s.c }}>{s.v}</div>
              <div className="text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.map(c => (
            <button key={c.id} onClick={() => setSelected(selected?.id === c.id ? null : c)}
              className={cn("w-full flex items-center gap-3 px-5 py-4 border-b border-border text-left hover:bg-muted/20 transition-colors",
                selected?.id === c.id ? "bg-muted/40" : ""
              )}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 text-black"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}
              >
                {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-card-foreground text-sm">{c.name}</span>
                  {c.kyc === "Verified" ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <AlertCircle className="w-3.5 h-3.5 text-yellow-500" />}
                </div>
                <div className="text-xs text-muted-foreground">{c.phone} • {c.city}</div>
                <div className="flex items-center gap-3 mt-0.5 text-xs">
                  <span className="text-muted-foreground">₹{(c.total / 100000).toFixed(1)}L total</span>
                  <span className="font-medium" style={{ color: GOLD }}>{c.points} pts</span>
                  {c.outstanding > 0 && <span className="text-red-500">₹{c.outstanding.toLocaleString("en-IN")} due</span>}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
            className="flex-1 border-l border-border flex flex-col overflow-hidden bg-card"
          >
            <div className="px-6 py-5 border-b border-border flex-shrink-0">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-black"
                    style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}
                  >
                    {selected.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-card-foreground text-lg">{selected.name}</h2>
                      <span className={cn("text-xs px-2 py-0.5 rounded-full", selected.kyc === "Verified" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700")}>
                        {selected.kyc}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">{selected.phone} • {selected.city}</div>
                    <div className="text-xs text-muted-foreground">Since {selected.joined} • {selected.visits} visits</div>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="p-1 text-muted-foreground hover:text-card-foreground"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { l: "Total Purchase", v: `₹${(selected.total / 100000).toFixed(1)}L`, c: GOLD },
                  { l: "Loyalty Points", v: selected.points, c: GREEN },
                  { l: "Wallet", v: `₹${selected.wallet.toLocaleString("en-IN")}`, c: BLUE },
                  { l: "Outstanding", v: selected.outstanding > 0 ? `₹${selected.outstanding.toLocaleString("en-IN")}` : "Nil", c: selected.outstanding > 0 ? RED : GREEN },
                ].map(s => (
                  <div key={s.l} className="bg-background rounded-xl p-3 text-center border border-border">
                    <div className="font-bold text-lg" style={{ color: s.c }}>{s.v}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-3 border-b border-border flex-shrink-0 flex gap-2">
              {[{ l: "New Sale", i: ShoppingCart }, { l: "Ledger", i: Receipt }, { l: "Call", i: Phone }, { l: "WhatsApp", i: Send }, { l: "Edit", i: Edit }].map(({ l, i: Icon }, idx) => (
                <button key={l} className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                  idx === 0 ? "text-black border-transparent" : "text-muted-foreground border-border hover:border-yellow-400/50"
                )} style={idx === 0 ? { background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` } : {}}>
                  <Icon className="w-3.5 h-3.5" /> {l}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                <h3 className="font-semibold text-card-foreground text-sm mb-3">Purchase History</h3>
                <div className="space-y-2">
                  {purchaseHistory.map(tx => (
                    <div key={tx.inv} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-background">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,175,55,0.08)" }}>
                        <Receipt className="w-3.5 h-3.5" style={{ color: GOLD }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-card-foreground">{tx.item}</div>
                        <div className="text-xs text-muted-foreground">{tx.inv} • {tx.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-card-foreground">₹{tx.amount.toLocaleString("en-IN")}</div>
                        <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">{tx.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground text-sm mb-3">KYC Documents</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[{ l: "PAN Card", v: "ABCDE1234F", ok: true }, { l: "Aadhaar", v: "XXXX XXXX 4321", ok: true }, { l: "GST No.", v: "Not Provided", ok: false }, { l: "Photo ID", v: "Uploaded", ok: true }].map(d => (
                    <div key={d.l} className="p-3 rounded-xl border border-border bg-background flex items-center gap-2">
                      <div className={cn("w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0", d.ok ? "bg-green-50" : "bg-yellow-50")}>
                        {d.ok ? <Check className="w-3 h-3 text-green-500" /> : <AlertCircle className="w-3 h-3 text-yellow-500" />}
                      </div>
                      <div>
                        <div className="text-xs font-medium text-card-foreground">{d.l}</div>
                        <div className="text-xs text-muted-foreground">{d.v}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── MANUFACTURING ─────────────────────────────────────────
function ManufacturingPage() {
  const [tab, setTab] = useState("karigar");
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-5 pt-4 border-b border-border flex-shrink-0">
        <div className="flex gap-1">
          {[{ k: "karigar", l: "Karigar" }, { k: "jobs", l: "Job Cards" }, { k: "orders", l: "Mfg Orders" }, { k: "repair", l: "Repair" }].map(t => (
            <button key={t.k} onClick={() => setTab(t.k)}
              className={cn("px-4 py-2 text-sm font-medium border-b-2 transition-colors", tab === t.k ? "border-yellow-400 text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}
            >{t.l}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-5">
        {tab === "karigar" && (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-3">
              {[{ l: "Total Karigars", v: karigarData.length, c: GOLD }, { l: "Active", v: karigarData.filter(k=>k.status==="Active").length, c: GREEN }, { l: "Jobs In Progress", v: jobCards.length, c: BLUE }, { l: "On Leave", v: 1, c: ORANGE }].map(s => (
                <div key={s.l} className="bg-card rounded-xl border border-border p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: s.c }}>{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {karigarData.map(k => (
                <div key={k.id} className="bg-card rounded-xl border border-border p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}>
                      {k.name.split(" ").map(n=>n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-card-foreground text-sm truncate">{k.name}</div>
                      <div className="text-xs text-muted-foreground">{k.specialty}</div>
                    </div>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", k.status === "Active" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700")}>{k.status}</span>
                  </div>
                  <div className="grid grid-cols-3 text-center gap-2">
                    {[{ l: "Active", v: k.active }, { l: "Done", v: k.completed }, { l: "Rating", v: k.rating }].map(s => (
                      <div key={s.l} className="bg-background rounded-lg p-2">
                        <div className="text-sm font-bold text-card-foreground">{s.v}</div>
                        <div className="text-xs text-muted-foreground">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "jobs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {jobCards.map(j => (
              <div key={j.id} className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">{j.id}</div>
                    <div className="font-semibold text-card-foreground text-sm mt-0.5">{j.item}</div>
                  </div>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0",
                    j.status === "In Progress" ? "bg-blue-50 text-blue-700" :
                    j.status === "Polishing" ? "bg-purple-50 text-purple-700" :
                    j.status === "Stone Setting" ? "bg-yellow-50 text-yellow-700" : "bg-orange-50 text-orange-700"
                  )}>{j.status}</span>
                </div>
                <div className="space-y-1.5 text-xs text-muted-foreground mb-3">
                  <div className="flex justify-between"><span>Karigar:</span><span className="font-medium text-card-foreground">{j.karigar}</span></div>
                  <div className="flex justify-between"><span>Weight:</span><span className="font-medium text-card-foreground">{j.weight}</span></div>
                  <div className="flex justify-between"><span>Due Date:</span><span className="font-medium text-card-foreground">{j.dueDate}</span></div>
                </div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-card-foreground">{j.progress}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${j.progress}%`, background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {(tab === "orders" || tab === "repair") && (
          <div className="flex items-center justify-center h-48 text-muted-foreground">
            <div className="text-center">
              <Hammer className="w-10 h-10 mx-auto mb-3 opacity-25" />
              <p className="font-medium">Coming Soon</p>
              <p className="text-sm mt-1 opacity-60">Module under development</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SCHEMES ───────────────────────────────────────────────
function SchemesPage() {
  return (
    <div className="p-5 space-y-5 overflow-auto h-full">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {[
          { l: "Active Schemes", v: "4", c: GOLD }, { l: "Total Enrolled", v: "261", c: GREEN },
          { l: "Monthly Collection", v: "₹32L", c: BLUE }, { l: "Maturity This Month", v: "12", c: ORANGE },
        ].map(s => (
          <div key={s.l} className="bg-card rounded-xl border border-border p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: s.c }}>{s.v}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-foreground">Active Saving Schemes</h3>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-black text-sm font-bold" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}>
          <Plus className="w-4 h-4" /> New Scheme
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {schemeData.map(s => (
          <div key={s.id} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-muted-foreground">{s.id}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium">Active</span>
            </div>
            <h4 className="font-semibold text-card-foreground mb-4">{s.name}</h4>
            <div className="space-y-2 text-xs">
              {[
                { l: "Duration", v: s.duration },
                { l: "Monthly Amount", v: `₹${s.monthlyAmt.toLocaleString("en-IN")}` },
                { l: "Members Enrolled", v: s.enrolled },
                { l: "Next Due Date", v: s.nextDue },
              ].map(r => (
                <div key={r.l} className="flex justify-between">
                  <span className="text-muted-foreground">{r.l}:</span>
                  <span className="font-semibold text-card-foreground">{r.v}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-1.5 rounded-lg text-xs border border-border text-muted-foreground hover:border-yellow-400/50">View Members</button>
              <button className="flex-1 py-1.5 rounded-lg text-xs text-black font-semibold" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}>Enroll</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ACCOUNTS ──────────────────────────────────────────────
function AccountsPage({ dark }: { dark: boolean }) {
  const [tab, setTab] = useState("cashbook");
  const opening = 345200;
  const receipts = cashBookEntries.filter(e => e.type === "Receipt").reduce((s, e) => s + e.amount, 0);
  const payments = cashBookEntries.filter(e => e.type === "Payment").reduce((s, e) => s + e.amount, 0);
  const closing = opening + receipts - payments;

  const tabs = [
    { k: "cashbook", l: "Cash Book" }, { k: "bankbook", l: "Bank Book" },
    { k: "pl", l: "Profit & Loss" }, { k: "journal", l: "Journal" }, { k: "expenses", l: "Expenses" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-5 pt-4 border-b border-border flex-shrink-0">
        <div className="flex gap-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {tabs.map(t => (
            <button key={t.k} onClick={() => setTab(t.k)}
              className={cn("px-4 py-2 text-sm font-medium border-b-2 transition-colors flex-shrink-0", tab === t.k ? "border-yellow-400 text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}
            >{t.l}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-5">
        {tab === "cashbook" && (
          <div className="space-y-4">
            {/* Summary */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { l: "Opening Balance", v: `₹${opening.toLocaleString("en-IN")}`, c: BLUE },
                { l: "Total Receipts", v: `₹${receipts.toLocaleString("en-IN")}`, c: GREEN },
                { l: "Total Payments", v: `₹${payments.toLocaleString("en-IN")}`, c: RED },
                { l: "Closing Balance", v: `₹${closing.toLocaleString("en-IN")}`, c: GOLD },
              ].map(s => (
                <div key={s.l} className="bg-card rounded-xl border border-border p-4 text-center">
                  <div className="text-xl font-bold" style={{ color: s.c }}>{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input type="date" defaultValue="2024-11-28" className="px-3 py-2 border border-border rounded-xl bg-card text-card-foreground text-sm focus:outline-none" />
                <span className="text-muted-foreground text-sm">to</span>
                <input type="date" defaultValue="2024-11-28" className="px-3 py-2 border border-border rounded-xl bg-card text-card-foreground text-sm focus:outline-none" />
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-xl text-sm text-muted-foreground hover:border-yellow-400/50"><Printer className="w-4 h-4" /> Print</button>
                <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-xl text-sm text-muted-foreground hover:border-yellow-400/50"><Download className="w-4 h-4" /> Export</button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-black text-sm font-bold" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}>
                  <Plus className="w-4 h-4" /> Add Entry
                </button>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    {["Date", "Description", "Type", "Debit (₹)", "Credit (₹)"].map((h, i) => (
                      <th key={h} className={cn("px-5 py-3 text-left text-xs font-semibold text-muted-foreground", i >= 3 && "text-right")}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border bg-muted/20">
                    <td className="px-5 py-2.5 text-xs text-muted-foreground">28 Nov 2024</td>
                    <td className="px-5 py-2.5 text-xs font-semibold text-card-foreground" colSpan={2}>Opening Balance</td>
                    <td className="px-5 py-2.5 text-xs text-right" />
                    <td className="px-5 py-2.5 text-xs font-bold text-right" style={{ color: GREEN }}>₹{opening.toLocaleString("en-IN")}</td>
                  </tr>
                  {cashBookEntries.map((e, i) => (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                      <td className="px-5 py-3 text-xs text-muted-foreground">{e.date}</td>
                      <td className="px-5 py-3 text-xs text-card-foreground">{e.desc}</td>
                      <td className="px-5 py-3">
                        <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", e.type === "Receipt" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700")}>{e.type}</span>
                      </td>
                      <td className="px-5 py-3 text-xs text-right font-semibold">
                        {e.type === "Payment" ? <span className="text-red-500">₹{e.amount.toLocaleString("en-IN")}</span> : "—"}
                      </td>
                      <td className="px-5 py-3 text-xs text-right font-semibold">
                        {e.type === "Receipt" ? <span className="text-green-600">₹{e.amount.toLocaleString("en-IN")}</span> : "—"}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-yellow-400/30">
                    <td className="px-5 py-3 text-xs font-bold text-card-foreground" colSpan={2}>Closing Balance</td>
                    <td />
                    <td className="px-5 py-3 text-xs text-right font-bold text-card-foreground" />
                    <td className="px-5 py-3 text-xs text-right font-bold" style={{ color: GOLD }}>₹{closing.toLocaleString("en-IN")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "pl" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 max-w-4xl">
            {[
              { title: "Income", items: [{ l: "Sales Revenue", v: 8940000 }, { l: "Other Income", v: 125000 }], total: 9065000, positive: true },
              { title: "Expenses", items: [{ l: "Cost of Goods Sold", v: 5970000 }, { l: "Rent", v: 360000 }, { l: "Salaries", v: 480000 }, { l: "Utilities", v: 85000 }, { l: "Marketing", v: 120000 }], total: 7015000, positive: false },
            ].map(section => (
              <div key={section.title} className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold text-card-foreground text-base mb-4 pb-3 border-b border-border">{section.title}</h3>
                <div className="space-y-2.5">
                  {section.items.map(item => (
                    <div key={item.l} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.l}</span>
                      <span className="font-semibold text-card-foreground">₹{(item.v / 100000).toFixed(1)}L</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-base border-t border-border pt-3">
                    <span className="text-card-foreground">Total {section.title}</span>
                    <span style={{ color: section.positive ? GREEN : RED }}>₹{(section.total / 100000).toFixed(1)}L</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="xl:col-span-2 bg-card rounded-xl border-2 p-5 text-center" style={{ borderColor: GOLD }}>
              <p className="text-muted-foreground mb-1 text-sm">Net Profit (FY 2024-25)</p>
              <p className="text-4xl font-bold" style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}>₹20.5 Lakhs</p>
              <p className="text-muted-foreground text-sm mt-1">Profit Margin: 22.6%</p>
            </div>
          </div>
        )}

        {["bankbook", "journal", "expenses"].includes(tab) && (
          <div className="flex items-center justify-center h-48 text-muted-foreground">
            <div className="text-center">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-25" />
              <p className="font-medium">Module Available</p>
              <p className="text-sm mt-1 opacity-60">Select from submenu to view detailed ledger</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── REPORTS ───────────────────────────────────────────────
function ReportsPage({ dark }: { dark: boolean }) {
  const reportTypes = [
    { l: "Sales Reports", i: ShoppingCart, c: GOLD, d: "Daily, monthly, yearly sales with item-wise breakdown" },
    { l: "Purchase Reports", i: Truck, c: BLUE, d: "Supplier-wise purchase analysis and comparisons" },
    { l: "Stock Reports", i: Package, c: GREEN, d: "Live stock, dead stock, movement history" },
    { l: "GST Reports", i: FileText, c: ORANGE, d: "GSTR-1, GSTR-3B, input tax credit" },
    { l: "Profit & Loss", i: TrendingUp, c: PURPLE, d: "Item-wise profit, margin analysis" },
    { l: "Customer Ledger", i: Users, c: "#EC4899", d: "Individual customer account statements" },
    { l: "Supplier Ledger", i: Truck, c: "#06B6D4", d: "Supplier-wise purchase and payment history" },
    { l: "Karigar Reports", i: Hammer, c: ORANGE, d: "Job work completion and payment reports" },
    { l: "Barcode Report", i: QrCode, c: BLUE, d: "Product-wise barcode & RFID inventory" },
    { l: "Employee Reports", i: UserCheck, c: GREEN, d: "Staff attendance, performance, payroll" },
    { l: "Inventory Aging", i: Clock, c: RED, d: "Slow moving and dead stock analysis" },
    { l: "AI Insights", i: Brain, c: GOLD, d: "AI-powered trends, predictions, recommendations" },
  ];

  const tt = {
    contentStyle: { background: dark ? "#141821" : "#fff", border: "1px solid rgba(212,175,55,0.25)", borderRadius: "12px", fontSize: "12px" },
    labelStyle: { color: dark ? "#E4E4EC" : "#1A1A1A", fontWeight: 600 },
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-5 pt-4 pb-3 border-b border-border flex-shrink-0 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <input type="date" defaultValue="2024-11-01" className="px-3 py-2 border border-border rounded-xl bg-card text-card-foreground text-sm focus:outline-none" />
          <span className="text-muted-foreground text-sm">to</span>
          <input type="date" defaultValue="2024-11-28" className="px-3 py-2 border border-border rounded-xl bg-card text-card-foreground text-sm focus:outline-none" />
        </div>
        <select className="px-3 py-2 border border-border rounded-xl bg-card text-card-foreground text-sm focus:outline-none">
          {["All Branches", "Main Branch", "Anna Nagar Branch"].map(b => <option key={b}>{b}</option>)}
        </select>
        <div className="flex-1" />
        <div className="flex gap-2">
          {[{ l: "PDF", i: Download }, { l: "Excel", i: FileText }, { l: "Print", i: Printer }].map(({ l, i: Icon }) => (
            <button key={l} className="flex items-center gap-2 px-3 py-2 border border-border rounded-xl text-sm text-muted-foreground hover:border-yellow-400/50 transition-all">
              <Icon className="w-4 h-4" /> {l}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-5 space-y-5">
        {/* Report cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {reportTypes.map(r => (
            <motion.button key={r.l} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
              className="bg-card rounded-xl border border-border p-4 text-left hover:border-yellow-400/40 transition-all"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: `${r.c}18` }}>
                <r.i className="w-4 h-4" style={{ color: r.c }} />
              </div>
              <div className="font-semibold text-card-foreground text-sm mb-1">{r.l}</div>
              <div className="text-xs text-muted-foreground leading-snug">{r.d}</div>
            </motion.button>
          ))}
        </div>

        {/* Quick chart preview */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-card-foreground mb-1">Top Selling Products — November</h3>
            <p className="text-xs text-muted-foreground mb-4">By revenue (₹ Lakhs)</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { name: "22K Necklace", v: 18.4 }, { name: "Diamond Ring", v: 14.2 },
                { name: "Gold Bangles", v: 12.8 }, { name: "Gold Earrings", v: 9.5 },
                { name: "Platinum Ring", v: 7.3 }, { name: "Silver Anklet", v: 4.1 },
              ]} layout="vertical" margin={{ left: 80, right: 8, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"} />
                <XAxis type="number" tick={{ fill: dark ? "#666" : "#999", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: dark ? "#888" : "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...tt} formatter={(v: number) => [`₹${v}L`, "Revenue"]} />
                <Bar dataKey="v" fill={GOLD} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-card-foreground mb-1">Customer Growth</h3>
            <p className="text-xs text-muted-foreground mb-4">Cumulative registered customers FY 2024-25</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={customerGrowthData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="gcg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={BLUE} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={BLUE} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"} />
                <XAxis dataKey="month" tick={{ fill: dark ? "#666" : "#999", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: dark ? "#666" : "#999", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...tt} formatter={(v: number) => [v.toLocaleString("en-IN"), "Customers"]} />
                <Area type="monotone" dataKey="customers" stroke={BLUE} strokeWidth={2} fill="url(#gcg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MASTERS ───────────────────────────────────────────────
function MastersPage() {
  const [active, setActive] = useState("categories");
  const sections = [
    { k: "categories", l: "Jewellery Categories", cnt: 24 },
    { k: "purity", l: "Metal Purity", cnt: 8 },
    { k: "stones", l: "Stone Master", cnt: 32 },
    { k: "making", l: "Making Charges", cnt: 6 },
    { k: "gst", l: "GST Master", cnt: 3 },
    { k: "employees", l: "Employees", cnt: 12 },
    { k: "branches", l: "Branches", cnt: 3 },
    { k: "roles", l: "Roles & Permissions", cnt: 9 },
  ];
  const catRows = [
    { name: "Necklace", prefix: "NK", metal: "Gold/Silver", active: true },
    { name: "Ring", prefix: "RN", metal: "All", active: true },
    { name: "Bangles", prefix: "BN", metal: "All", active: true },
    { name: "Earrings", prefix: "ER", metal: "All", active: true },
    { name: "Chain", prefix: "CH", metal: "Gold/Silver", active: true },
    { name: "Pendant", prefix: "PD", metal: "Gold", active: true },
    { name: "Anklet", prefix: "AN", metal: "Silver", active: true },
    { name: "Mangalsutra", prefix: "MS", metal: "Gold", active: true },
  ];
  return (
    <div className="flex h-full overflow-hidden">
      <div className="w-56 flex-shrink-0 border-r border-border bg-card p-3 overflow-y-auto">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-3">Master Data</h3>
        {sections.map(s => (
          <button key={s.k} onClick={() => setActive(s.k)}
            className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm mb-1 transition-colors",
              active === s.k ? "text-black font-semibold" : "text-muted-foreground hover:text-card-foreground hover:bg-muted/40"
            )}
            style={active === s.k ? { background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` } : {}}
          >
            <span className="truncate">{s.l}</span>
            <span className={cn("text-xs px-1.5 py-0.5 rounded-full flex-shrink-0", active === s.k ? "bg-black/10" : "bg-muted text-muted-foreground")}>{s.cnt}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex-shrink-0 flex items-center justify-between">
          <h2 className="font-semibold text-foreground">{sections.find(s => s.k === active)?.l}</h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input placeholder="Search…" className="pl-9 pr-4 py-2 border border-border rounded-xl bg-background text-card-foreground text-sm focus:outline-none w-48" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-black text-sm font-bold" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}>
              <Plus className="w-4 h-4" /> Add New
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-5">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  {["Name", "Prefix / Code", "Applicable Metal", "Items", "Status", "Actions"].map((h, i) => (
                    <th key={h} className={cn("px-5 py-3 text-left text-xs font-semibold text-muted-foreground", i >= 5 && "text-center")}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {catRows.map((r, i) => (
                  <tr key={r.name} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3 font-medium text-card-foreground text-sm">{r.name}</td>
                    <td className="px-5 py-3"><span className="font-mono text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">{r.prefix}</span></td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{r.metal}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{Math.floor(Math.random() * 50) + 10}</td>
                    <td className="px-5 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium">Active</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 text-muted-foreground hover:text-yellow-500 rounded-lg hover:bg-yellow-50 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 text-muted-foreground hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PURCHASE ──────────────────────────────────────────────
function PurchasePage() {
  const poData = [
    { id: "PO-2024-0045", supplier: "Mahalaxmi Gold Co.", date: "25 Nov 2024", items: "Raw Gold 100gm", amount: 590000, status: "Pending GRN" },
    { id: "PO-2024-0044", supplier: "Rajasthan Gems House", date: "22 Nov 2024", items: "Diamond 0.5ct × 20", amount: 285000, status: "Received" },
    { id: "PO-2024-0043", supplier: "Bombay Silver Mart", date: "20 Nov 2024", items: "Silver Bar 500gm", amount: 37100, status: "Received" },
    { id: "PO-2024-0042", supplier: "Mahalaxmi Gold Co.", date: "15 Nov 2024", items: "Gold Coins 22K × 5", amount: 295000, status: "Received" },
  ];
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex-shrink-0 flex items-center justify-between">
        <div className="flex gap-1">
          {["Purchase Entry", "Purchase Orders", "Supplier Payments", "GRN"].map(t => (
            <button key={t} className={cn("px-4 py-2 text-sm font-medium rounded-xl transition-colors", t === "Purchase Orders" ? "text-black" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}
              style={t === "Purchase Orders" ? { background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` } : {}}
            >{t}</button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-black text-sm font-bold" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}>
          <Plus className="w-4 h-4" /> New Purchase
        </button>
      </div>
      <div className="flex-1 overflow-auto p-5">
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[{ l: "This Month", v: "₹12.4L", c: BLUE }, { l: "Pending GRN", v: "3", c: ORANGE }, { l: "Suppliers", v: "18", c: GOLD }, { l: "Outstanding", v: "₹5.9L", c: RED }].map(s => (
            <div key={s.l} className="bg-card rounded-xl border border-border p-4 text-center">
              <div className="text-xl font-bold" style={{ color: s.c }}>{s.v}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                {["PO Number", "Supplier", "Date", "Items", "Amount", "Status", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {poData.map(po => (
                <tr key={po.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{po.id}</td>
                  <td className="px-5 py-3 font-medium text-card-foreground text-sm">{po.supplier}</td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">{po.date}</td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">{po.items}</td>
                  <td className="px-5 py-3 font-bold text-card-foreground">₹{po.amount.toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", po.status === "Received" ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700")}>{po.status}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-muted-foreground hover:text-blue-500 rounded-lg hover:bg-blue-50"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-muted-foreground hover:text-yellow-500 rounded-lg hover:bg-yellow-50"><Edit className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── SETTINGS ──────────────────────────────────────────────
function SettingsPage() {
  const [tab, setTab] = useState("company");
  const [primaryColor, setPrimaryColor] = useState(GOLD);
  const [radius, setRadius] = useState("0.625");
  const [darkSidebar, setDarkSidebar] = useState(true);
  const [goldRate22k, setGoldRate22k] = useState("5842");
  const [goldRate24k, setGoldRate24k] = useState("6320");
  const [silverRate, setSilverRate] = useState("74.20");
  const [wastage, setWastage] = useState("3");
  const [hallmark, setHallmark] = useState("45");
  const [makingType, setMakingType] = useState("percent");
  const [makingValue, setMakingValue] = useState("12");
  const [gstRate, setGstRate] = useState("3");

  const tabs = [
    { k: "company", l: "Company Profile", i: Building2 },
    { k: "rate", l: "Rate Calculation", i: Coins },
    { k: "invoice", l: "Invoice Template", i: FileText },
    { k: "appearance", l: "Appearance", i: Sparkles },
    { k: "users", l: "Users & Roles", i: UserCheck },
    { k: "gst", l: "GST Configuration", i: Percent },
    { k: "notifications", l: "SMS / Email / WA", i: Send },
    { k: "backup", l: "Backup & Restore", i: Database },
    { k: "jwt", l: "JWT & Sessions", i: Shield },
  ];

  const sampleGold = 5.0;
  const rateCalc = (() => {
    const rate = parseFloat(goldRate22k) || 5842;
    const metalValue = sampleGold * rate;
    const wastageAmt = metalValue * (parseFloat(wastage) / 100);
    const makingCharges = makingType === "percent" ? metalValue * (parseFloat(makingValue) / 100) : parseFloat(makingValue) * sampleGold;
    const hallmarkAmt = parseFloat(hallmark) || 45;
    const subtotal = metalValue + wastageAmt + makingCharges + hallmarkAmt;
    const gst = subtotal * (parseFloat(gstRate) / 100);
    return { metalValue, wastageAmt, makingCharges, hallmarkAmt, subtotal, gst, total: subtotal + gst };
  })();

  return (
    <div className="flex h-full overflow-hidden">
      {/* Settings sidebar */}
      <div className="w-56 flex-shrink-0 border-r border-border bg-card p-3 overflow-y-auto">
        {tabs.map(t => (
          <button key={t.k} onClick={() => setTab(t.k)}
            className={cn("w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-sm mb-1 transition-colors",
              tab === t.k ? "text-black font-semibold" : "text-muted-foreground hover:text-card-foreground hover:bg-muted/40"
            )}
            style={tab === t.k ? { background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` } : {}}
          >
            <t.i className={cn("w-4 h-4 flex-shrink-0", tab === t.k ? "text-black" : "")} />
            <span className="truncate text-xs">{t.l}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {tab === "company" && (
          <div className="max-w-2xl space-y-6">
            <div>
              <h2 className="font-bold text-foreground text-xl mb-1">Company Profile</h2>
              <p className="text-muted-foreground text-sm">Configure your store details for invoices and reports</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-border">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center border-2 border-dashed border-border cursor-pointer hover:border-yellow-400/50 transition-colors" style={{ background: "rgba(212,175,55,0.05)" }}>
                  <Gem className="w-6 h-6" style={{ color: GOLD }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">Store Logo</p>
                  <p className="text-xs text-muted-foreground">PNG or SVG, 400×400px min</p>
                  <button className="mt-2 text-xs font-medium hover:underline" style={{ color: GOLD }}>Upload Logo</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { l: "Business Name", v: "JewelERP Pro Jewellers" },
                  { l: "GST Number", v: "27AABCJ1234N1Z5" },
                  { l: "PAN Number", v: "AABCJ1234N" },
                  { l: "Phone Number", v: "+91 98765 43210" },
                  { l: "Email Address", v: "info@jewelshop.com" },
                  { l: "Website", v: "www.jewelshop.com" },
                ].map(f => (
                  <div key={f.l}>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">{f.l}</label>
                    <input defaultValue={f.v} className="w-full px-3 py-2.5 border border-border rounded-xl bg-background text-card-foreground text-sm focus:outline-none focus:ring-2" style={{ "--tw-ring-color": GOLD } as React.CSSProperties} />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">Full Address</label>
                <textarea rows={3} defaultValue="123, Jewellers Lane, T. Nagar, Chennai - 600017, Tamil Nadu"
                  className="w-full px-3 py-2.5 border border-border rounded-xl bg-background text-card-foreground text-sm focus:outline-none resize-none"
                />
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-black font-bold text-sm" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}>
                <Check className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>
        )}

        {tab === "rate" && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="font-bold text-foreground text-xl mb-1">Rate Calculation Engine</h2>
              <p className="text-muted-foreground text-sm">Configure how jewellery prices are calculated in real-time</p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <div className="bg-card rounded-xl border border-border p-5 space-y-4">
                <h3 className="font-semibold text-card-foreground">Metal Rates (per gram)</h3>
                {[
                  { l: "Gold 22K Rate (₹/gm)", v: goldRate22k, set: setGoldRate22k },
                  { l: "Gold 24K Rate (₹/gm)", v: goldRate24k, set: setGoldRate24k },
                  { l: "Silver Rate (₹/gm)", v: silverRate, set: setSilverRate },
                ].map(f => (
                  <div key={f.l}>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">{f.l}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                      <input type="number" value={f.v} onChange={e => f.set(e.target.value)}
                        className="w-full pl-7 pr-4 py-2.5 border border-border rounded-xl bg-background text-card-foreground text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">Wastage %</label>
                    <input type="number" value={wastage} onChange={e => setWastage(e.target.value)}
                      className="w-full px-3 py-2.5 border border-border rounded-xl bg-background text-card-foreground text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">Hallmark Charge (₹)</label>
                    <input type="number" value={hallmark} onChange={e => setHallmark(e.target.value)}
                      className="w-full px-3 py-2.5 border border-border rounded-xl bg-background text-card-foreground text-sm focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">Making Charges Type</label>
                  <div className="flex gap-2 mb-2">
                    {[{ v: "percent", l: "Percentage (%)" }, { v: "pergram", l: "Per Gram (₹/gm)" }, { v: "fixed", l: "Fixed Amount" }].map(o => (
                      <button key={o.v} onClick={() => setMakingType(o.v)}
                        className="flex-1 py-2 rounded-lg text-xs font-medium border transition-all"
                        style={makingType === o.v ? { background: GOLD, borderColor: GOLD, color: "#1A1A1A" } : { borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                      >{o.l}</button>
                    ))}
                  </div>
                  <input type="number" value={makingValue} onChange={e => setMakingValue(e.target.value)} placeholder="Value"
                    className="w-full px-3 py-2.5 border border-border rounded-xl bg-background text-card-foreground text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">GST Rate (%)</label>
                  <div className="flex gap-2">
                    {["1.5", "3", "5", "18"].map(r => (
                      <button key={r} onClick={() => setGstRate(r)}
                        className="flex-1 py-2 rounded-lg text-xs font-medium border transition-all"
                        style={gstRate === r ? { background: GOLD, borderColor: GOLD, color: "#1A1A1A" } : { borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                      >{r}%</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Preview */}
              <div className="bg-card rounded-xl border-2 border-border p-5 space-y-4" style={{ borderColor: `${GOLD}40` }}>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4" style={{ color: GOLD }} />
                  <h3 className="font-semibold text-card-foreground">Live Price Preview</h3>
                </div>
                <p className="text-xs text-muted-foreground">Sample: 22K Gold Ring, 5.0 grams</p>
                <div className="space-y-2.5">
                  {[
                    { l: "Metal Value (5g × ₹" + goldRate22k + ")", v: rateCalc.metalValue },
                    { l: `Wastage (${wastage}%)`, v: rateCalc.wastageAmt },
                    { l: `Making (${makingType === "percent" ? makingValue + "%" : "₹" + makingValue + "/gm"})`, v: rateCalc.makingCharges },
                    { l: "Hallmark Charges", v: rateCalc.hallmarkAmt },
                  ].map(row => (
                    <div key={row.l} className="flex justify-between text-sm">
                      <span className="text-muted-foreground text-xs">{row.l}</span>
                      <span className="font-semibold text-card-foreground text-xs">₹{row.v.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 flex justify-between text-sm">
                    <span className="text-muted-foreground text-xs">Subtotal</span>
                    <span className="font-semibold text-card-foreground text-xs">₹{rateCalc.subtotal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground text-xs">GST ({gstRate}%)</span>
                    <span className="font-semibold text-card-foreground text-xs">₹{rateCalc.gst.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="border-t-2 border-border pt-2 flex justify-between">
                    <span className="font-bold text-card-foreground">Final Price</span>
                    <span className="font-bold text-xl" style={{ color: GOLD }}>₹{rateCalc.total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
                <button className="w-full py-2.5 rounded-xl font-bold text-black text-sm flex items-center justify-center gap-2" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}>
                  <Check className="w-4 h-4" /> Save Rate Configuration
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === "appearance" && (
          <div className="max-w-2xl space-y-6">
            <div>
              <h2 className="font-bold text-foreground text-xl mb-1">Appearance & Theme Builder</h2>
              <p className="text-muted-foreground text-sm">Customize the look and feel of your JewelERP Pro interface</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Primary Brand Color</label>
                <div className="flex items-center gap-4">
                  <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)}
                    className="w-12 h-12 rounded-xl border border-border cursor-pointer"
                  />
                  <div className="flex gap-2">
                    {[GOLD, "#1E3A8A", "#10B981", "#EC4899", "#8B5CF6", "#EF4444"].map(c => (
                      <button key={c} onClick={() => setPrimaryColor(c)}
                        className="w-8 h-8 rounded-lg border-2 transition-all"
                        style={{ background: c, borderColor: primaryColor === c ? "#fff" : "transparent" }}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-sm text-muted-foreground">{primaryColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Border Radius</label>
                <div className="flex gap-2">
                  {[{ v: "0", l: "Square" }, { v: "0.375", l: "Subtle" }, { v: "0.625", l: "Default" }, { v: "1", l: "Rounded" }, { v: "1.5", l: "Pill" }].map(o => (
                    <button key={o.v} onClick={() => setRadius(o.v)}
                      className="flex-1 py-2 text-xs font-medium border transition-all"
                      style={radius === o.v
                        ? { background: primaryColor, borderColor: primaryColor, color: "#1A1A1A", borderRadius: `${o.v}rem` }
                        : { borderColor: "var(--border)", color: "var(--muted-foreground)", borderRadius: "0.5rem" }
                      }
                    >{o.l}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Interface Options</label>
                <div className="space-y-3">
                  {[
                    { l: "Dark sidebar", d: "Keep sidebar always dark regardless of theme", v: darkSidebar, set: setDarkSidebar },
                    { l: "Compact mode", d: "Reduce padding for more information density", v: false, set: () => {} },
                    { l: "Animated transitions", d: "Smooth page transitions and micro-interactions", v: true, set: () => {} },
                    { l: "Glassmorphism cards", d: "Apply frosted glass effect to dashboard cards", v: false, set: () => {} },
                  ].map(opt => (
                    <div key={opt.l} className="flex items-center justify-between py-2">
                      <div>
                        <div className="text-sm font-medium text-card-foreground">{opt.l}</div>
                        <div className="text-xs text-muted-foreground">{opt.d}</div>
                      </div>
                      <button
                        onClick={() => opt.set(!opt.v)}
                        className="w-10 h-5 rounded-full transition-all relative flex-shrink-0"
                        style={{ background: opt.v ? primaryColor : "var(--switch-background)" }}
                      >
                        <span className="absolute top-0.5 transition-all w-4 h-4 rounded-full bg-white shadow-sm" style={{ left: opt.v ? "22px" : "2px" }} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="rounded-xl p-4 border"
                style={{ background: `${primaryColor}08`, borderColor: `${primaryColor}30` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: primaryColor }}>
                    <Gem className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Preview — {primaryColor}</div>
                    <div className="text-xs text-muted-foreground">Button, badge, and highlight samples</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button className="px-4 py-2 rounded-lg text-sm font-bold text-black" style={{ background: primaryColor, borderRadius: `${radius}rem` }}>Primary Button</button>
                  <button className="px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: primaryColor, color: primaryColor, borderRadius: `${radius}rem` }}>Outline</button>
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold text-black" style={{ background: primaryColor }}>Badge</span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium border" style={{ borderColor: primaryColor, color: primaryColor }}>Tag</span>
                </div>
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-black font-bold text-sm" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}>
                <Check className="w-4 h-4" /> Apply Theme
              </button>
            </div>
          </div>
        )}

        {tab === "users" && (
          <div className="max-w-4xl space-y-5">
            <div>
              <h2 className="font-bold text-foreground text-xl mb-1">Users & Roles</h2>
              <p className="text-muted-foreground text-sm">Manage staff accounts and role-based permissions</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["Owner", "Admin", "Manager", "Cashier", "Sales Executive", "Accountant", "Inventory Manager", "Karigar", "Viewer"].map(r => (
                <div key={r} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-black text-xs font-bold" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}>
                    {r[0]}
                  </div>
                  <div>
                    <div className="font-medium text-card-foreground text-sm">{r}</div>
                    <div className="text-xs text-muted-foreground">{r === "Owner" ? "Full access" : r === "Admin" ? "All except delete" : "Limited access"}</div>
                  </div>
                  <button className="ml-auto p-1.5 text-muted-foreground hover:text-yellow-500 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {["invoice", "gst", "notifications", "backup", "jwt"].includes(tab) && (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <Settings className="w-10 h-10 mx-auto mb-3 opacity-25 animate-spin" style={{ animationDuration: "4s" }} />
              <p className="font-medium">{tabs.find(t => t.k === tab)?.l}</p>
              <p className="text-sm mt-1 opacity-60">Configuration module ready</p>
              <button className="mt-4 px-5 py-2.5 rounded-xl text-black font-bold text-sm" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}>
                Configure Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── AI ASSISTANT ──────────────────────────────────────────
function AIAssistantPage({ dark }: { dark: boolean }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! I am JewelAI, your intelligent business assistant. I can help you with sales analysis, inventory insights, customer recommendations, gold rate trends, and natural language report queries. How can I help you today?" },
    { role: "user", text: "Show me which products had the highest sales this month" },
    { role: "assistant", text: "Based on November 2024 data:\n\n🥇 22K Gold Necklace — ₹18.4L (12 units)\n🥈 Diamond Solitaire Ring — ₹14.2L (8 units)\n🥉 22K Gold Bangle Set — ₹12.8L (4 units)\n\nGold jewellery accounts for 68.5% of your total revenue. Diamond products show the highest margin at 32%. I recommend stocking up on 22K Necklaces — you only have 3 units left." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Predict next month's gold sales",
    "Which customers have pending payments?",
    "Show low stock items that need reordering",
    "Analyze profit margins by category",
    "Who are my top 5 customers this year?",
    "GST summary for November 2024",
  ];

  const aiResponses: Record<string, string> = {
    default: "Based on my analysis of your store data, I can provide detailed insights on that topic. Let me pull the relevant data and generate a comprehensive report for you."
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", text: aiResponses[userMsg] || `I've analysed your request: "${userMsg}"\n\nHere's what I found in your JewelERP Pro data:\n\n• Your store data shows strong performance in this area\n• I recommend reviewing the detailed report in the Reports module\n• I can generate a PDF report or send it via WhatsApp if needed\n\nWould you like me to dig deeper into any specific aspect?` }]);
      setLoading(false);
    }, 1400);
  };

  const insights = [
    { title: "Sales Prediction", value: "₹98L expected", note: "December 2024 (AI forecast)", trend: "up", icon: TrendingUp },
    { title: "Reorder Alert", value: "3 items low", note: "Gold Bangles, Silver Set + 1", trend: "alert", icon: AlertCircle },
    { title: "Top Customer", value: "Rajesh Kumar", note: "₹12.5L purchases this year", trend: "up", icon: Star },
    { title: "Gold Rate Trend", value: "↑ 2.1% MTM", note: "Expected ₹6,100 by Jan 2025", trend: "up", icon: Coins },
  ];

  return (
    <div className="flex h-full overflow-hidden gap-0">
      {/* Chat */}
      <div className="flex-1 flex flex-col overflow-hidden border-r border-border">
        <div className="px-5 py-3 border-b border-border flex-shrink-0 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}>
            <Brain className="w-4 h-4 text-black" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">JewelAI Assistant</h3>
            <p className="text-xs text-green-500">Online • Analysing your data</p>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="p-2 rounded-xl text-muted-foreground hover:text-yellow-500 hover:bg-muted/40 transition-colors"><Mic className="w-4 h-4" /></button>
            <button className="p-2 rounded-xl text-muted-foreground hover:text-blue-500 hover:bg-muted/40 transition-colors"><Camera className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              {m.role === "assistant" && (
                <div className="w-7 h-7 rounded-lg flex items-center justify-center mr-2 flex-shrink-0 mt-0.5" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}>
                  <Brain className="w-3.5 h-3.5 text-black" />
                </div>
              )}
              <div
                className={cn("max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line",
                  m.role === "user"
                    ? "text-black rounded-br-sm"
                    : "bg-card border border-border text-card-foreground rounded-bl-sm"
                )}
                style={m.role === "user" ? { background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` } : {}}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}>
                <Brain className="w-3.5 h-3.5 text-black" />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }}
                    animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div className="px-5 pb-2 flex-shrink-0">
          <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {suggestions.map(s => (
              <button key={s} onClick={() => { setInput(s); }}
                className="flex-shrink-0 px-3 py-1.5 rounded-xl border border-border text-xs text-muted-foreground hover:text-card-foreground hover:border-yellow-400/50 transition-all bg-card"
              >{s}</button>
            ))}
          </div>
        </div>

        <div className="px-5 pb-5 flex-shrink-0 flex items-center gap-3">
          <input
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Ask me anything about your jewellery business…"
            className="flex-1 px-4 py-3 border border-border rounded-xl bg-background text-card-foreground text-sm focus:outline-none focus:ring-2"
            style={{ "--tw-ring-color": GOLD } as React.CSSProperties}
          />
          <button onClick={sendMessage} disabled={!input.trim()}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-black transition-all hover:opacity-90 disabled:opacity-40"
            style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right panel — AI Insights */}
      <div className="w-72 flex-shrink-0 flex flex-col overflow-hidden bg-card">
        <div className="px-4 py-4 border-b border-border flex-shrink-0">
          <h3 className="font-semibold text-card-foreground text-sm">AI Insights</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Real-time business intelligence</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {insights.map(ins => (
            <div key={ins.title} className="bg-background rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: ins.trend === "alert" ? `${RED}18` : `${GOLD}18` }}>
                  <ins.icon className="w-3.5 h-3.5" style={{ color: ins.trend === "alert" ? RED : GOLD }} />
                </div>
                <span className="text-xs font-semibold text-muted-foreground">{ins.title}</span>
              </div>
              <div className="font-bold text-card-foreground text-base">{ins.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{ins.note}</div>
            </div>
          ))}

          <div className="bg-background rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4" style={{ color: GOLD }} />
              <span className="text-xs font-semibold text-muted-foreground">Today's Recommendations</span>
            </div>
            <div className="space-y-2.5">
              {[
                "Restock 22K Gold Bangles — only 2 left",
                "Follow up with Meena Patel (₹38,200 estimate pending)",
                "Gold rate up 0.8% — good time to sell",
              ].map(r => (
                <div key={r} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: GOLD }} />
                  <p className="text-xs text-card-foreground leading-snug">{r}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background rounded-xl border border-border p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-2">AI Features</p>
            <div className="space-y-1.5">
              {["Sales Prediction", "Inventory Suggestions", "Rate Trend Analysis", "Customer Insights", "Invoice OCR Scan", "Voice Search"].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── NOTIFICATIONS PANEL ───────────────────────────────────
function NotificationsPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{ x: 320, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 320, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border shadow-2xl z-50 flex flex-col"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
        <h3 className="font-semibold text-card-foreground">Notifications</h3>
        <button onClick={onClose} className="p-1 text-muted-foreground hover:text-card-foreground"><X className="w-4 h-4" /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {notifications.map(n => (
          <div key={n.id} className="flex items-start gap-3 p-3 rounded-xl bg-background border border-border">
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              n.type === "alert" ? "bg-red-50" : n.type === "success" ? "bg-green-50" : n.type === "warning" ? "bg-yellow-50" : "bg-blue-50"
            )}>
              {n.type === "alert" && <AlertCircle className="w-4 h-4 text-red-500" />}
              {n.type === "success" && <CheckCircle2 className="w-4 h-4 text-green-500" />}
              {n.type === "warning" && <AlertCircle className="w-4 h-4 text-yellow-500" />}
              {n.type === "info" && <Activity className="w-4 h-4 text-blue-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-card-foreground leading-snug">{n.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 py-4 border-t border-border flex-shrink-0">
        <button className="w-full text-center text-sm font-medium" style={{ color: GOLD }}>Mark all as read</button>
      </div>
    </motion.div>
  );
}

// ─── APP ───────────────────────────────────────────────────
export default function App() {
  const [auth, setAuth] = useState(false);
  const [dark, setDark] = useState(false);
  const [module, setModule] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  if (!auth) return <LoginPage onLogin={() => setAuth(true)} />;

  const renderModule = () => {
    switch (module) {
      case "dashboard": return <Dashboard dark={dark} />;
      case "pos": return <POSBilling />;
      case "inventory": return <InventoryPage />;
      case "customers": return <CustomersPage />;
      case "manufacturing": return <ManufacturingPage />;
      case "schemes": return <SchemesPage />;
      case "accounts": return <AccountsPage dark={dark} />;
      case "reports": return <ReportsPage dark={dark} />;
      case "masters": return <MastersPage />;
      case "purchase": return <PurchasePage />;
      case "settings": return <SettingsPage />;
      case "ai": return <AIAssistantPage dark={dark} />;
      default: return (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <div className="text-center">
            <Gem className="w-12 h-12 mx-auto mb-4 opacity-20" style={{ color: GOLD }} />
            <p className="font-medium text-foreground">Module Available</p>
            <p className="text-sm mt-1">Select from the sidebar to continue</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={cn("h-screen flex overflow-hidden bg-background", dark ? "dark" : "")}>
      {/* Sidebar */}
      <Sidebar active={module} onSelect={setModule} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header
          dark={dark} onToggleDark={() => setDark(!dark)} onLogout={() => setAuth(false)}
          activeModule={module} notifCount={notifications.length}
          onNotif={() => setShowNotif(!showNotif)}
          sidebarCollapsed={collapsed} onToggleSidebar={() => setCollapsed(false)}
        />
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={module}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0"
            >
              {renderModule()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Notification drawer */}
      <AnimatePresence>
        {showNotif && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setShowNotif(false)}
            />
            <NotificationsPanel onClose={() => setShowNotif(false)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
