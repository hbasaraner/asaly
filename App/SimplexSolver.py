from __future__ import print_function
from ortools.linear_solver import pywraplp
from Earthquake import Earthquake


class Simplex:
    def __init__(self, _depots, _gatheringPoints):
        self.depots = _depots
        self.gatheringPoints = _gatheringPoints

    def solve(self):
        depotsCount = len(self.depots)
        pointsCount = len(self.gatheringPoints)

#   Find Distance matrix from depots to gatheringpoints
        distanceMatrix = []
        for i in range(depotsCount):
            distanceMatrix.append([])
            for j in range(pointsCount):
                distanceMatrix[i].append(int(Earthquake.haversine(
                    float(self.depots[i][2]), float(self.depots[i][1]),
                    float(self.gatheringPoints[j][2]), float(self.gatheringPoints[j][1]))))

        solver = pywraplp.Solver('simple_mip_program',
                                 pywraplp.Solver.CBC_MIXED_INTEGER_PROGRAMMING)
        infinity = solver.infinity()
        #   all integer non-negative variables.
        variables = []
        for i in range(depotsCount):
            variables.append([])
            for j in range(pointsCount):
                x = solver.IntVar(0.0, infinity, 'x' + str(i) + str(j))
                variables[i].append(x)

        print('Number of variables = ', solver.NumVariables())
        # x + 7 * y <= 17.5.

        for j in range(len(variables[0])):
            solver.Add(solver.Sum([variables[i][j]
                                   for i in range(depotsCount)]) == 1)

        print('Number of constraints = ', solver.NumConstraints())

        # Maximize x + 10 * y.ü

        solver.Minimize(solver.Sum([distanceMatrix[i][j] * variables[i][j]
                                    for i in range(depotsCount)
                                    for j in range(pointsCount)]))

        result_status = solver.Solve()
    # The problem has an optimal solution.
        assert result_status == pywraplp.Solver.OPTIMAL
        print('Total cost = ', solver.Objective().Value())
        print()
        for i in range(depotsCount):
            for j in range(pointsCount):
                if variables[i][j].solution_value() > 0:
                    print('depot %s assigned to point %s.  Cost = %d' % (
                        str(self.depots[i][0]),
                        str(self.gatheringPoints[j][0]),
                        distanceMatrix[i][j]))

        print()
        print("Time = ", solver.WallTime(), " milliseconds")

#   Find objective function


#   Find Constraints
earthquake = Earthquake(1)
earthquake.start()
simplex = Simplex(earthquake.depots, earthquake.gatheringPoints)
simplex.solve()
