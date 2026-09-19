import React, { useEffect, useState } from "react";
import {
    CreditCard,
    Receipt,
    CheckCircle2,
    Clock3,
    RefreshCw,
} from "lucide-react";

import PageHeader from "../../components/PageHeader";
import Loading from "../../components/Loading";
import api from "../../services/api";

const Bills = () => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [payingId, setPayingId] = useState(null);

    const loadBills = async () => {
        try {
            setLoading(true);

            const response = await api.get("/bills");

            console.log("Bills API response:", response.data);

            setBills(response.data || []);
        } catch (error) {
            console.error("Failed to load bills:", error);

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load bills"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBills();
    }, []);

    const formatDate = (date) => {
        if (!date) return "-";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "-";
        }

        return parsedDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatAmount = (amount) => {
        if (amount === null || amount === undefined) {
            return "₹0";
        }

        return `₹${Number(amount).toLocaleString("en-IN")}`;
    };

    const getStatus = (bill) => {
        return bill.status || "PENDING";
    };

    const payBill = async (bill) => {
        try {
            setPayingId(bill.id);

            await api.put(`/bills/${bill.id}/status`, null, {
                params: {
                    status: "PAID",
                },
            });

            alert("Payment completed successfully");

            await loadBills();
        } catch (error) {
            console.error("Payment error:", error);

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to pay bill"
            );
        } finally {
            setPayingId(null);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <PageHeader
                eyebrow="Patient Portal"
                title="Bills"
                description="View your hospital billing information."
            />

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Billing History
                    </h2>

                    <p className="text-sm text-slate-500">
                        {bills.length} bill{bills.length !== 1 ? "s" : ""}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={loadBills}
                    className="secondary-button flex items-center gap-2"
                >
                    <RefreshCw size={16} />
                    Refresh
                </button>
            </div>

            {/* Empty */}
            {bills.length === 0 ? (
                <div className="panel py-14 text-center">
                    <Receipt
                        size={44}
                        className="mx-auto mb-4 text-slate-300"
                    />

                    <h3 className="text-lg font-semibold text-slate-700">
                        No bills found
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        You don't have any billing records yet.
                    </p>
                </div>
            ) : (
                <div className="grid gap-5 md:grid-cols-2">
                    {bills.map((bill) => {
                        const status = getStatus(bill);
                        const isPaid = status === "PAID";
                        const isPaying = payingId === bill.id;

                        return (
                            <div
                                key={bill.id}
                                className="rounded-2xl border bg-white p-6 shadow-sm"
                            >
                                {/* Top */}
                                <div className="flex items-start justify-between">
                                    <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                                        <Receipt size={22} />
                                    </div>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                                            isPaid
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "bg-amber-50 text-amber-700"
                                        }`}
                                    >
                    {status}
                  </span>
                                </div>

                                {/* Bill number */}
                                <p className="mt-5 text-xs text-slate-400">
                                    {bill.invoiceNumber ||
                                        bill.billNumber ||
                                        `BILL-${bill.id}`}{" "}
                                    • {formatDate(bill.billDate || bill.createdAt)}
                                </p>

                                {/* Amount */}
                                <h3 className="mt-2 text-3xl font-bold text-slate-900">
                                    {formatAmount(bill.amount || bill.totalAmount)}
                                </h3>

                                {/* Description */}
                                {bill.description && (
                                    <p className="mt-2 text-sm text-slate-500">
                                        {bill.description}
                                    </p>
                                )}

                                {/* Patient */}
                                {bill.patient?.name && (
                                    <p className="mt-3 text-sm text-slate-500">
                                        Patient:{" "}
                                        <span className="font-medium text-slate-700">
                      {bill.patient.name}
                    </span>
                                    </p>
                                )}

                                {/* Paid */}
                                {isPaid && (
                                    <p className="mt-4 flex items-center gap-1 text-xs font-medium text-emerald-600">
                                        <CheckCircle2 size={14} />
                                        Payment completed
                                    </p>
                                )}

                                {/* Pending */}
                                {!isPaid && (
                                    <button
                                        type="button"
                                        onClick={() => payBill(bill)}
                                        disabled={isPaying}
                                        className="primary-button mt-5 flex items-center gap-2"
                                    >
                                        {isPaying ? (
                                            <>
                                                <Clock3 size={16} />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard size={16} />
                                                Pay Bill
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
export default Bills;