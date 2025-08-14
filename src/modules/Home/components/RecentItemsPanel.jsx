import React from 'react';
import ItemCard from '../../Inventory/components/ItemCard';
import { Package } from 'lucide-react';

const RecentItemsPanel = ({ items, navigate, theme }) => (
	<div className="p-6 rounded-lg" style={{ backgroundColor: theme.palette.background.card, boxShadow: theme.shadows.card }}>
		<div className="flex justify-between items-center mb-4">
			<h2 className="text-xl font-bold" style={{ color: theme.palette.text.primary }}>
				Recent Items
			</h2>
			<button onClick={() => navigate('/inventory')} className="text-sm font-medium transition-colors" style={{ color: theme.palette.primary.main }}>
				View Inventory →
			</button>
		</div>
		<div className="space-y-3">
			{items.length > 0 ? (
				items.map((item) => (
					<ItemCard key={item.id} item={item} variant="grid" showRarity={true} onClick={() => navigate('/inventory')} className="w-full" />
				))
			) : (
				<div className="text-center py-4">
					<Package className="w-8 h-8 mx-auto mb-2" style={{ color: theme.palette.text.secondary }} />
					<p className="text-sm" style={{ color: theme.palette.text.secondary }}>
						No items in inventory
					</p>
				</div>
			)}
		</div>
	</div>
);

export default RecentItemsPanel;


