import React from 'react';
import { useGlobalState } from './GlobalState';
import SolutionsGrid from './SolutionsGrid';
import DataScienceChannel from './DataScienceChannel';
import StatisticsChannel from './StatisticsChannel';
import VisualizationChannel from './VisualizationChannel';
import AIStrategiesChannel from './AIStrategiesChannel';
import DigitalTransformationChannel from './DigitalTransformationChannel';
import VibeCodingChannel from './VibeCodingChannel';

const MySolutions = () => {
  const { activeChannel } = useGlobalState();

  const renderChannel = () => {
    switch (activeChannel) {
      case "Grid":
        return <SolutionsGrid />;
      case "DS":
        return <DataScienceChannel />;
      case "STATS":
        return <StatisticsChannel />;
      case "VIS":
        return <VisualizationChannel />;
      case "AI":
        return <AIStrategiesChannel />;
      case "DX":
        return <DigitalTransformationChannel />;
      case "VIBE":
        return <VibeCodingChannel />;
      default:
        return <SolutionsGrid />;
    }
  };

  return <div className="w-full">{renderChannel()}</div>;
};

export default MySolutions;