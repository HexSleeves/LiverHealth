import React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { AlertCircle } from "~/lib/icons";

interface Props {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

interface State {
  hasError: boolean;
  error?: Error;
}

interface ErrorFallbackProps {
  error?: Error;
  resetError: () => void;
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
}) => (
  <View className="flex-1 justify-center items-center p-4 bg-background">
    <Card className="w-full max-w-md">
      <CardHeader className="items-center">
        <View className="w-16 h-16 bg-destructive/10 rounded-full items-center justify-center mb-4">
          <AlertCircle size={32} className="text-destructive" />
        </View>
        <CardTitle className="text-center text-xl text-destructive">
          Something went wrong
        </CardTitle>
      </CardHeader>
      <CardContent className="gap-y-4">
        <Text className="text-center text-muted-foreground">
          {error?.message || "An unexpected error occurred"}
        </Text>
        <Button onPress={resetError} className="w-full">
          <Text>Try Again</Text>
        </Button>
      </CardContent>
    </Card>
  </View>
);

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}