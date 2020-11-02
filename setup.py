import setuptools

setuptools.setup(
    name="emcenter-gateway-django-app",
    version="0.0.1",
    description="Custom output viewer and django app for EMCenter Gateway",
    packages=setuptools.find_packages(),
    install_requires=[
        'django>=1.11.16'
    ],
    entry_points="""
[airavata.djangoapp]
emcenter_gateway = emcenter_gateway.apps:EMCenterGatewayAppConfig
""",
)
