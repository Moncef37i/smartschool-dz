import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const PlaceholderPage = ({ title }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your {title.toLowerCase()} settings and data.</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="min-h-[400px] flex items-center justify-center border-dashed border-2 bg-gray-50/50 dark:bg-dark-bg/50">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center text-gray-500">
            <div className="w-20 h-20 bg-gray-100 dark:bg-dark-card rounded-2xl flex items-center justify-center mb-6">
              <span className="text-4xl text-gray-400 dark:text-gray-600">🏗️</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title} Module Under Construction</h2>
            <p className="max-w-md text-sm text-gray-500 mx-auto mb-6">
              This module is currently being built. It will feature full CRUD operations, detailed reporting, and advanced filters.
            </p>
            <Button variant="outline">Go Back</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PlaceholderPage;
