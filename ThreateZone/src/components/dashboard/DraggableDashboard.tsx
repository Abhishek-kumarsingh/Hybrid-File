import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { usePreferences } from '../../contexts/PreferencesContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Save, RotateCcw, Move } from 'lucide-react';
import { toast } from 'sonner';

// Create a responsive grid layout
const ResponsiveGridLayout = WidthProvider(Responsive);

// Define the layout for different breakpoints
const defaultLayouts = {
  lg: [
    { i: 'threats', x: 0, y: 0, w: 6, h: 8 },
    { i: 'sensors', x: 6, y: 0, w: 6, h: 8 },
    { i: 'analytics', x: 0, y: 8, w: 6, h: 8 },
    { i: 'status', x: 6, y: 8, w: 6, h: 8 },
  ],
  md: [
    { i: 'threats', x: 0, y: 0, w: 6, h: 8 },
    { i: 'sensors', x: 6, y: 0, w: 6, h: 8 },
    { i: 'analytics', x: 0, y: 8, w: 6, h: 8 },
    { i: 'status', x: 6, y: 8, w: 6, h: 8 },
  ],
  sm: [
    { i: 'threats', x: 0, y: 0, w: 12, h: 8 },
    { i: 'sensors', x: 0, y: 8, w: 12, h: 8 },
    { i: 'analytics', x: 0, y: 16, w: 12, h: 8 },
    { i: 'status', x: 0, y: 24, w: 12, h: 8 },
  ],
  xs: [
    { i: 'threats', x: 0, y: 0, w: 12, h: 8 },
    { i: 'sensors', x: 0, y: 8, w: 12, h: 8 },
    { i: 'analytics', x: 0, y: 16, w: 12, h: 8 },
    { i: 'status', x: 0, y: 24, w: 12, h: 8 },
  ],
};

interface DraggableDashboardProps {
  children: React.ReactNode[];
}

const DraggableDashboard: React.FC<DraggableDashboardProps> = ({ children }) => {
  const { preferences, updatePreference } = usePreferences();
  const [layouts, setLayouts] = useState(defaultLayouts);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentLayout, setCurrentLayout] = useState(defaultLayouts.lg);

  // Load saved layout from preferences on mount
  useEffect(() => {
    try {
      const savedLayout = localStorage.getItem('dashboard-layout');
      if (savedLayout) {
        const parsedLayout = JSON.parse(savedLayout);
        setLayouts(parsedLayout);
      }
    } catch (error) {
      console.error('Failed to load saved layout:', error);
    }
  }, []);

  // Handle layout change
  const handleLayoutChange = (layout: any, allLayouts: any) => {
    setCurrentLayout(layout);
    setLayouts(allLayouts);
  };

  // Save layout
  const saveLayout = () => {
    localStorage.setItem('dashboard-layout', JSON.stringify(layouts));
    setIsEditMode(false);
    toast.success('Dashboard layout saved successfully');
  };

  // Reset layout
  const resetLayout = () => {
    if (window.confirm('Are you sure you want to reset the dashboard layout?')) {
      localStorage.removeItem('dashboard-layout');
      setLayouts(defaultLayouts);
      setIsEditMode(false);
      toast.success('Dashboard layout reset to default');
    }
  };

  // Map children to layout items
  const childrenWithKeys = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return null;

    // Get the key from the layout
    const key = defaultLayouts.lg[index]?.i || `widget-${index}`;

    return React.cloneElement(child as React.ReactElement<any>, {
      key,
      'data-grid': { ...defaultLayouts.lg[index] },
    });
  });

  return (
    <div className="relative">
      {/* Edit mode controls */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant={isEditMode ? 'default' : 'outline'}
            size="sm"
            onClick={() => setIsEditMode(!isEditMode)}
            leftIcon={<Move size={16} />}
            className="mr-2"
          >
            {isEditMode ? 'Editing Layout' : 'Edit Layout'}
          </Button>

          {isEditMode && (
            <>
              <Button
                variant="success"
                size="sm"
                onClick={saveLayout}
                leftIcon={<Save size={16} />}
                className="mr-2"
              >
                Save Layout
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={resetLayout}
                leftIcon={<RotateCcw size={16} />}
              >
                Reset
              </Button>
            </>
          )}
        </div>

        {isEditMode && (
          <div className="text-sm text-muted-foreground">
            Drag widgets to rearrange • Resize from the bottom-right corner
          </div>
        )}
      </div>

      {/* Grid layout */}
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 12 }}
        rowHeight={30}
        isDraggable={isEditMode}
        isResizable={isEditMode}
        onLayoutChange={handleLayoutChange}
        margin={[16, 16]}
      >
        {childrenWithKeys}
      </ResponsiveGridLayout>
    </div>
  );
};

export default DraggableDashboard;
