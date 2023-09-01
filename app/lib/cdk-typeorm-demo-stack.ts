import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { SharedResourcesContext } from '../utils/context/context'

export class DemoSharedResourcesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, context: SharedResourcesContext, props?: cdk.StackProps, ) {
    super(scope, id, props);

    console.log('context', context)


    new s3.Bucket(this, 'MyFirstBucket', {
      versioned: true
    });
    new s3.Bucket(this, 'MySecondBucket', {
      versioned: true
    });
  }
}
