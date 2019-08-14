FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY back-end/back-end.csproj back-end/
RUN dotnet restore back-end/back-end.csproj
COPY . .
WORKDIR /src/back-end
RUN dotnet build back-end.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish back-end.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "back-end.dll"]
