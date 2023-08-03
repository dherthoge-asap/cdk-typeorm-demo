import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns'
import * as rds from 'aws-cdk-lib/aws-rds'
import { Construct } from 'constructs';

export class CdkTypeormDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'Vpc', { maxAzs: 2 })
    const ecsCluster = new ecs.Cluster(this, 'EcsCluster', { vpc: vpc })
    const fargateService = new ecsPatterns.NetworkLoadBalancedFargateService(this, 'Fargate', {
      cluster: ecsCluster,
      listenerPort: 3000,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset(`${__dirname}/../app`)
      }
    })

    // const fargateService = new ecs.Cluster(this, 'FargateService', {
    //   capacity: {
    //     instanceType: new ec2.InstanceType('t2.small')
    //   },
    //   vpc
    // })
    // const taskDefinition = new ecs.Ec2TaskDefinition(this, 'TaskDef')
    // taskDefinition.addContainer('DefaultContainer', {
    //   image: ecs.ContainerImage.fromAsset(`${__dirname}/../app`),
    //   memoryLimitMiB: 512
    // })
    // const ecsService = new ecs.Ec2Service(this, 'Service', {
    //   cluster: fargateService,
    //   taskDefinition: taskDefinition
    // })
    const rdsCluster = new rds.DatabaseCluster(this, 'Database', {
      engine: rds.DatabaseClusterEngine.auroraMysql({ version: rds.AuroraMysqlEngineVersion.VER_3_03_1 }),
      credentials: rds.Credentials.fromGeneratedSecret('clusteradmin'), // Optional - will default to 'admin' username and generated password
      writer: rds.ClusterInstance.provisioned('writer', {
        publiclyAccessible: false
      }),
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      vpc
    })
  }
}
