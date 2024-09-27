import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importa Link y useNavigate de react-router-dom

const SettleBalanceComponent = () => {
    const members = [
        { nombre: "Tomas machuca", email: "tomasmachuca@gmail.com" },
        { nombre: "Marco riccitelli", email: "marcoriccitelli@gmail.com" },
        { nombre: "Franco Magurno", email: "francomagurno@gmail.com" },
    ];

    const payments = [
        { paidBy: 'tomasmachuca@gmail.com', amount: 999 },
        { paidBy: 'marcoriccitelli@gmail.com', amount: 400 },
        { paidBy: 'francomagurno@gmail.com', amount: 80 },
    ];

    const [balanceDetails, setBalanceDetails] = useState([]);
    const [divisions, setDivisions] = useState(
        members.map(() => ({ type: 'equal', value: 0 })) // Inicializar tipo de división para cada miembro
    );
    const navigate = useNavigate(); // Definir el hook para redirigir

    // Calcular el balance sin el modal
    const handleSettleBalance = () => {
        const totalPaid = payments.reduce((acc, payment) => acc + payment.amount, 0);

        // Obtener la suma de todas las divisiones personalizadas (para "en partes")
        const totalCustomParts = divisions
            .filter((division) => division.type === 'parts')
            .reduce((acc, division) => acc + parseFloat(division.value || 0), 0);

        // Calcular el share de cada miembro (considerando si es "igual" o "en partes")
        const totalEqualMembers = divisions.filter((division) => division.type === 'equal').length;
        const adjustedEqualShare = (totalPaid - totalCustomParts) / totalEqualMembers;

        const balances = members.map((member, index) => {
            const paidByMember = payments
                .filter((payment) => payment.paidBy === member.email)
                .reduce((acc, payment) => acc + payment.amount, 0);

            const memberShare =
                divisions[index].type === 'equal'
                    ? adjustedEqualShare
                    : (totalPaid * parseFloat(divisions[index].value || 0)) / 100;

            return {
                member: member.nombre,
                balance: paidByMember - memberShare, // Positivo significa que pagó de más, negativo que pagó de menos
            };
        });

        // Calcular quién le debe a quién
        const toPay = [];
        const owes = balances.filter((b) => b.balance < 0);
        const surplus = balances.filter((b) => b.balance > 0);

        // Resolver deudas
        while (owes.length && surplus.length) {
            const payer = owes[0]; // Quien debe pagar
            const receiver = surplus[0]; // Quien debe recibir

            const amount = Math.min(-payer.balance, receiver.balance);

            toPay.push({
                from: payer.member,
                to: receiver.member,
                amount: amount.toFixed(2),
            });

            payer.balance += amount;
            receiver.balance -= amount;

            if (payer.balance === 0) owes.shift();
            if (receiver.balance === 0) surplus.shift();
        }

        setBalanceDetails(toPay);
    };

    // Manejar el cambio en la forma de dividir (igual o en partes)
    const handleDivisionChange = (index, type, value) => {
        const updatedDivisions = [...divisions];
        updatedDivisions[index] = { type, value };
        setDivisions(updatedDivisions);
    };

    // Función para volver a la página de team-members y mostrar el balance
    const handleGoBackToTeamMembers = () => {
        navigate("/team-members", { state: { balanceClosed: true } }); // Envía el estado balanceClosed
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Menu Navigation */}
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-2xl font-semibold text-blue-600">SliceTicket</div>
                    <nav className="flex space-x-8">
                        <Link to="/menu" className="text-gray-700 hover:text-blue-500">Menu</Link>
                    </nav>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-grow p-4 sm:p-6 bg-gray-100">
                <div className="max-w-4xl w-full mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Cerrar Balance</h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Al cerrar el balance, se dividirá equitativamente entre los miembros del grupo, y se calculará quién debe pagar a quién.
                    </p>

                    {/* Tabla de resumen de pagos */}
                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full bg-gray-50 rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600">
                                    <th className="p-2 sm:p-4 text-left">Nombre</th>
                                    <th className="p-2 sm:p-4 text-left">Total Pagado</th>
                                    <th className="p-2 sm:p-4 text-left">A Dividir En</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map((member, index) => {
                                    const totalPaid = payments
                                        .filter((payment) => payment.paidBy === member.email)
                                        .reduce((acc, payment) => acc + payment.amount, 0);

                                    return (
                                        <tr key={index} className="border-t">
                                            <td className="p-2 sm:p-4 text-gray-800">{member.nombre}</td>
                                            <td className="p-2 sm:p-4 text-gray-600">${totalPaid.toFixed(2)}</td>
                                            <td className="p-2 sm:p-4 text-gray-600">
                                                <div className="flex items-center">
                                                    <select
                                                        value={divisions[index].type}
                                                        onChange={(e) =>
                                                            handleDivisionChange(index, e.target.value, divisions[index].value)
                                                        }
                                                        className="border border-gray-300 p-1 sm:p-2 rounded-lg focus:outline-none focus:ring"
                                                    >
                                                        <option value="equal">Partes Iguales</option>
                                                        <option value="parts">En Partes</option>
                                                    </select>
                                                    {divisions[index].type === 'parts' && (
                                                        <input
                                                            type="number"
                                                            value={divisions[index].value}
                                                            onChange={(e) =>
                                                                handleDivisionChange(index, 'parts', e.target.value)
                                                            }
                                                            className="ml-2 w-16 sm:w-20 p-1 sm:p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring"
                                                            placeholder="%"
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Botón para cerrar el balance */}
                    <div className="flex justify-center mb-6">
                        <button
                            onClick={handleSettleBalance}
                            className="px-4 sm:px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring"
                        >
                            Cerrar Balance
                        </button>
                    </div>

                    {/* Mostrar detalles de quién le debe a quién */}
                    {balanceDetails.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Resumen de Deudas</h3>
                            {balanceDetails.map((detail, index) => (
                                <div key={index} className="text-gray-700 mb-2">
                                    <strong>{detail.from}</strong> le debe <strong>${detail.amount}</strong> a <strong>{detail.to}</strong>.
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Botón para regresar a team-members */}
                    {balanceDetails.length > 0 && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleGoBackToTeamMembers}
                                className="px-4 sm:px-6 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring"
                            >
                                Volver
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default SettleBalanceComponent;
